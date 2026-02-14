const axios = require("axios");

const getChangedFiles = async (owner, repo, prNumber) => {
    try {
        const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
        });
        return response.data.map((file) => file.filename);
    } catch (error) {
        console.error("Error fetching changed files:", error.message);
        throw error;
    }
};

const postComment = async (owner, repo, prNumber, body) => {
    try {
        const url = `https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`;
        await axios.post(
            url,
            { body },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.v3+json",
                },
            }
        );
        console.log("Comment posted successfully.");
    } catch (error) {
        console.error("Error posting comment:", error.message);
    }
};

module.exports = { getChangedFiles, postComment };
