const mongoose = require("../config/db"),
  Schema = mongoose.Schema;

const option = new Schema({
  opt: Array,
});

const Options = mongoose.model("option_data", option);

module.exports = { Options };
