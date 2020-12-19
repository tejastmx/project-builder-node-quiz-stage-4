const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var questions = require("./controller/questionController");
var options = require("./controller/optionController");
var answers = require("./controller/answerController");
var app = express();

app.use(bodyParser.json());
app.use(cors({ module: "*" }));

app.listen(4000, () => console.log("listening on 4000"));

app.use("/api", questions);
app.use("/api/", options);
app.use("/api/", answers);
