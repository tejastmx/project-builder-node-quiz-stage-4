const mongoose = require("../config/db"),
  Schema = mongoose.Schema;
const { Answers } = require("../model/Answer");
const { Options } = require("../model/Option");

const question = new Schema({
  ques: String,
  answer: [{ type: Schema.Types.ObjectId, ref: "ans_data" }],
  options: [{ type: Schema.Types.ObjectId, ref: "option_data" }],
});

const Questions = mongoose.model("question_data", question);

module.exports = { Questions };
