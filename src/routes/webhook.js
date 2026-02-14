const express = require("express");
const router = express.Router();
const impactService = require("../services/impactService");

router.post("/webhook", async (req, res) => {
    try {
        const payload = req.body;
        const action = payload.action;

        console.log(`Received Webhook Event: ${action}`);

        // Return 200 OK immediately to satisfy GitHub timeout
        res.status(200).send("Webhook received");

        // Process asynchronously
        if (action === "opened" || action === "synchronize") {
            await impactService.processPullRequest(payload);
        } else {
            console.log(`Skipping action: ${action}`);
        }
    } catch (error) {
        console.error("Webhook Error:", error.message);
    }
});

module.exports = router;
