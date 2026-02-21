const TestCase = require("../models/TestCase");
const githubService = require("./githubService");

function calculateSeverity(moduleCount) {
  if (moduleCount >= 4) return "HIGH";
  if (moduleCount >= 2) return "MEDIUM";
  return "LOW";
}
const processPullRequest = async (payload) => {
    try {
        const { action, pull_request, repository } = payload;

        if (action !== "opened" && action !== "synchronize") {
            console.log(`Ignoring action: ${action}`);
            return;
        }

        const owner = repository.owner.login;
        const repo = repository.name;
        const prNumber = pull_request.number;

        console.log(`Processing PR #${prNumber} for ${owner}/${repo}`);

        // 1. Get changed files
        const files = await githubService.getChangedFiles(owner, repo, prNumber);
        console.log("Changed Files:", files);

        // 2. Map files to modules
        const modules = new Set();
        files.forEach((file) => {
            const parts = file.split("/");
            if (parts.length > 1) {
                modules.add(parts[0]); // First folder is the module
            }
        });

        const impactedModules = Array.from(modules);
        console.log("Impacted Modules:", impactedModules);

        if (impactedModules.length === 0) {
            console.log("No impacted modules found.");
            return;
        }

        // 3. Fetch test cases from MongoDB
        const testCaseDocs = await TestCase.find({
            moduleName: { $in: impactedModules },
        });

        // 4. Generate Report
        const report = generateReport(impactedModules, testCaseDocs);
        console.log("\n--- Generated Report ---\n", report);

        // 5. Post Comment
        await githubService.postComment(owner, repo, prNumber, report);

    } catch (error) {
        console.error("Error processing PR:", error.message);
    }
};

const generateReport = (impactedModules, testCaseDocs) => {
    const severity = calculateSeverity(impactedModules.length);

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

    report += "### 📂 Impacted Modules:\n";
    impactedModules.forEach((mod) => {
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
    report += `- Total Impacted Modules: ${impactedModules.length}\n`;
    report += `- Total Suggested Test Cases: ${totalTestCases}\n`;

    return report;
};

module.exports = { processPullRequest };

