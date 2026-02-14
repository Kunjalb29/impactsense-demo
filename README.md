<<<<<<< HEAD
# ImpactSense – Pull Request Impact Analyzer

ImpactSense is a backend MVP that analyzes GitHub Pull Requests to determine impacted modules and suggest relevant test cases.

## Features
- 🎣 **Webhook Listener**: Listens for GitHub PR events.
- 📂 **Impact Analysis**: Maps changed files to modules based on folder structure.
- 🗄️ **Smart Mapping**: Fetches recommended test cases from MongoDB.
- 🤖 **Automated Reporting**: Posts a structured impact report back to the PR.

## Tech Stack
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database for test case mapping
- **Mongoose**: ODM
- **Axios**: HTTP client for GitHub API
- **ngrok**: Localhost tunneling

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Environment Variables**:
    Create a `.env` file:
    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://...
    GITHUB_TOKEN=ghp_...
    ```
3.  **Seed Database**:
    ```bash
    npm run seed
    ```
4.  **Run Server**:
    ```bash
    npm run dev
    ```

## Usage

1.  Expose your local server using ngrok: `ngrok http 5000`.
2.  Add the webhook URL (`https://.../webhook`) to your GitHub repository settings.
3.  Open a Pull Request modifying files in `auth/`, `payment/`, or `orders/` folders.
4.  Watch the bot comment with the impact report!

## Folder Structure

```
impactsense/
├── src/
│ ├── config/      # Database connection
│ ├── models/      # Mongoose models
│ ├── services/    # Business logic (GitHub, Impact)
│ ├── routes/      # API routes
│ └── app.js       # Express app setup
├── seed/          # Database seed scripts
├── server.js      # Entry point
└── ...
```
=======
# impactsense-demo
>>>>>>> 033fe371dad5fa7a9e74b282679bb4021905df43
