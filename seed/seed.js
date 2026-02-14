require("dotenv").config();
const mongoose = require("mongoose");
const TestCase = require("../src/models/TestCase");
const connectDB = require("../src/config/db");

const seedData = [
    {
        moduleName: "auth",
        testCases: ["TC_AUTH_01_Login", "TC_AUTH_02_Logout"],
    },
    {
        moduleName: "payment",
        testCases: ["TC_PAY_01_CreateOrder", "TC_PAY_02_Refund"],
    },
    {
        moduleName: "orders",
        testCases: ["TC_ORDER_01_Create", "TC_ORDER_02_Cancel"],
    },
];

const seedDB = async () => {
    try {
        await connectDB();

        // Clear existing data
        await TestCase.deleteMany({});
        console.log("Existing data cleared.");

        // Insert new data
        await TestCase.insertMany(seedData);
        console.log("Dummy data inserted successfully.");

        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
