const mongoose = require("../config/db"),
  Schema = mongoose.Schema;

const answer = new Schema({
  ans: String,
});

const Answers = mongoose.model("ans_data", answer);

module.exports = { Answers };
