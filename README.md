\# 🚀 ImpactSense – Pull Request Impact Analyzer



ImpactSense is a webhook-driven DevOps automation system that analyzes GitHub Pull Requests in real time, detects impacted modules, maps them to regression test cases stored in MongoDB Atlas, applies dependency-aware expansion, calculates risk severity, and automatically posts an impact report back to the PR.



---



\## 🎯 Problem Statement



In modern CI/CD pipelines, running full regression tests for every Pull Request is inefficient and time-consuming.



ImpactSense solves this by:



\- Detecting only impacted modules

\- Mapping relevant test cases

\- Estimating risk severity

\- Reducing unnecessary regression scope



---



\## 🧠 Key Features



\- 🔔 GitHub Webhook Integration

\- 📂 Changed File Analysis

\- 🗂 Module Detection (Folder-Based)

\- 🔗 Dependency-Aware Impact Expansion

\- 🔥 Risk-Based Severity Scoring (LOW / MEDIUM / HIGH)

\- 🧪 MongoDB-Based Test Case Mapping

\- 💬 Automated PR Commenting

\- 🐳 Fully Dockerized Deployment



---



\## 🏗 Architecture Overview





GitHub PR Event

↓

Webhook (Express API)

↓

Fetch Changed Files (GitHub API)

↓

Module Detection

↓

Dependency Expansion

↓

MongoDB Test Case Mapping

↓

Severity Calculation

↓

Auto Comment on Pull Request





---



\## 🔥 Innovation Layer



\### 1️⃣ Risk-Based Severity Scoring



PRs are categorized into:



\- LOW → Minimal testing

\- MEDIUM → Partial regression

\- HIGH → Full regression



Severity is dynamically calculated based on impacted modules.



---



\### 2️⃣ Dependency-Aware Expansion



If core modules such as `src` or `shared` change, dependent business modules are automatically marked as impacted.



This mimics real CI dependency graph logic.



---



\## 🧪 Example Generated Report



🚀 Impact Analysis Report

🔥 Impact Severity: MEDIUM



Moderate impact. Partial regression suggested.



🔗 Dependency-Aware Expansion Applied

📂 Final Impacted Modules:



auth



orders



🧪 Recommended Test Cases:



TC\_AUTH\_01\_Login



TC\_ORDERS\_02\_Create



Summary:



Total Impacted Modules: 2



Total Suggested Test Cases: 4





---



\## 🐳 Docker Setup



\### Build Image



```bash

docker build -t impactsense .

Run Container

docker run -p 5000:5000 --env-file .env impactsense

📦 Environment Variables



Create .env file:



MONGO\_URI=your\_mongo\_uri

GITHUB\_TOKEN=your\_github\_token

PORT=5000

☁️ Cloud-Native Design Principles



Event-driven architecture



Stateless containerized service



Environment-based configuration



Cloud-managed MongoDB Atlas



GitHub API integration



🚀 How It Works (Step-by-Step)



Developer opens or updates a PR



GitHub sends webhook to ImpactSense



Backend fetches changed files



Modules are detected and expanded via dependency graph



Test cases are retrieved from MongoDB



Severity score is calculated



Impact report is posted automatically to the PR



📈 Future Enhancements



Graph-based dynamic dependency modeling



GitHub Actions integration



Slack / Teams notifications



CI test execution integration



Historical impact analytics dashboard



🏆 Why ImpactSense Matters



ImpactSense demonstrates:



Backend architecture design



DevOps automation principles



CI optimization logic



Risk modeling



Cloud-native deployment practices



👨‍💻 Author



Kunjal B

Cloud Native Software Engineering





---



\# 🏆 Why This README Is Powerful



It shows:



✔ Architecture thinking  

✔ Innovation  

✔ DevOps alignment  

✔ Cloud-native awareness  

✔ Future scalability  



Faculty will immediately take you more seriously.



---



\# 🚀 Now Do This



1\. Replace your README with this

2\. Commit it:



```bash

git add README.md

git commit -m "docs: upgrade README with architecture and innovation details"

git push

