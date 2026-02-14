const mongoose = require("mongoose");

const TestCaseSchema = new mongoose.Schema({
  moduleName: {
    type: String,
    required: true,
    unique: true,
  },
  testCases: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("TestCase", TestCaseSchema);
