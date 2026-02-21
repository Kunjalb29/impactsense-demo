const express = require("express");
const router = express.Router();
const { processPullRequest } = require("../services/impactService");

router.post("/", async (req, res) => {
    try {
        console.log("🔔 Webhook received:", req.body.action);

        if (
            req.body.action === "opened" ||
            req.body.action === "synchronize"
        ) {
            await processPullRequest(req.body);
        }

        res.status(200).send("Webhook received");
    } catch (error) {
        console.error("❌ Webhook Error:", error.message);
        res.status(200).send("Error handled"); // prevents 502
    }
});

module.exports = router;
