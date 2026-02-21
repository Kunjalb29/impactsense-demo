const TestCase = require("../models/TestCase");
const githubService = require("./githubService");

/**
 * Dependency Graph
 * If these core folders change, expand impact to dependent modules
 */
const dependencyGraph = {
  "src": ["auth", "orders", "payment"],
  "shared": ["auth", "orders"],
  "config": ["auth", "orders", "payment"]
};

function calculateSeverity(moduleCount) {
  if (moduleCount >= 4) return "HIGH";
  if (moduleCount >= 2) return "MEDIUM";
  return "LOW";
}

const processPullRequest = async (payload) => {
  try {
    const { action, pull_request, repository } = payload;

    if (action !== "opened" && action !== "synchronize") {
      console.log(`[WEBHOOK] Ignoring action: ${action}`);
      return;
    }

    const owner = repository.owner.login;
    const repo = repository.name;
    const prNumber = pull_request.number;

    console.log(`[WEBHOOK] Processing PR #${prNumber} for ${owner}/${repo}`);

    // 1️⃣ Get changed files
    const files = await githubService.getChangedFiles(owner, repo, prNumber);
    console.log("[GITHUB] Changed Files:", files);

    // 2️⃣ Map files to modules
    const modules = new Set();
    files.forEach((file) => {
      const parts = file.split("/");
      if (parts.length > 1) {
        modules.add(parts[0]); // First folder is module
      }
    });

    const impactedModules = Array.from(modules);
    console.log("[IMPACT] Initial Impacted Modules:", impactedModules);

    if (impactedModules.length === 0) {
      console.log("[IMPACT] No impacted modules found.");
      return;
    }

    // 3️⃣ Apply Dependency Expansion
    const expandedModules = new Set(impactedModules);

    impactedModules.forEach((module) => {
      if (dependencyGraph[module]) {
        console.log(`[IMPACT] Expanding dependencies for: ${module}`);
        dependencyGraph[module].forEach((dependentModule) => {
          expandedModules.add(dependentModule);
        });
      }
    });

    const finalModules = Array.from(expandedModules);
    console.log("[IMPACT] Final Modules After Dependency Expansion:", finalModules);

    // 4️⃣ Fetch test cases from MongoDB
    const testCaseDocs = await TestCase.find({
      moduleName: { $in: finalModules },
    });

    // 5️⃣ Generate Report
    const report = generateReport(finalModules, testCaseDocs);
    console.log("\n--- Generated Report ---\n", report);

    // 6️⃣ Post Comment to GitHub
    await githubService.postComment(owner, repo, prNumber, report);
    console.log("[COMMENT] Impact report posted successfully.");

  } catch (error) {
    console.error("[ERROR] Processing PR failed:", error.message);
  }
};

const generateReport = (finalModules, testCaseDocs) => {
  const severity = calculateSeverity(finalModules.length);

  let severityNote = "";
  if (severity === "HIGH") {
    severityNote = "High risk PR. Full regression recommended.";
  } else if (severity === "MEDIUM") {
    severityNote = "Moderate impact. Partial regression suggested.";
  } else {
    severityNote = "Low impact. Minimal testing required.";
  }

  let report = "## 🚀 Impact Analysis Report\n\n";

  report += `### 🔥 Impact Severity: ${severity}\n`;
  report += `> ${severityNote}\n\n`;

  report += "### 🔗 Dependency-Aware Expansion Applied\n\n";

  report += "### 📂 Final Impacted Modules:\n";
  finalModules.forEach((mod) => {
    report += `- **${mod}**\n`;
  });

  report += "\n### 🧪 Recommended Test Cases:\n";
  let totalTestCases = 0;

  testCaseDocs.forEach((doc) => {
    report += `#### Module: ${doc.moduleName}\n`;
    doc.testCases.forEach((tc) => {
      report += `- ${tc}\n`;
      totalTestCases++;
    });
    report += "\n";
  });

  if (testCaseDocs.length === 0) {
    report += "_No mapped test cases found for these modules._\n";
  }

  report += "\n---\n";
  report += `**Summary:**\n`;
  report += `- Total Impacted Modules: ${finalModules.length}\n`;
  report += `- Total Suggested Test Cases: ${totalTestCases}\n`;
  
  return report;
};

module.exports = { processPullRequest };
