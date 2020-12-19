const express = require("express");
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var { Questions } = require("../model/Question");
var { Answers } = require("../model/Answer");
var { Options } = require("../model/Option");

router.route("/questions/get").get((req, res) => {
  Questions.find()
    .populate("answer")
    .populate("options")
    .exec((err, response) => {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.send(response);
        console.log(response);
      }
    });
});

router.route("/questions").post((req, res) => {
  if (req.body.ques == "") {
    res.status(404).send("please enter question");
  } else {
    var questions = new Questions(req.body);
    questions
      .save()
      .then((questions) => res.send(questions))
      .catch((err) =>
        res.status(400).send("error occured while posting question")
      );
  }
});

router.route("/questions").get((req, res) => {
  Questions.find((err, questions) => {
    if (err) {
      res.status(404).send("error occured while posting questions");
    } else {
      res.send(questions);
    }
  });
});

router.route("/questions/:id").get((req, res) => {
  Questions.findOne({ id: req.params.id }, (err, questions) => {
    if (err) {
      res.status(404).send("error occured while posting questions");
    } else {
      res.send(questions);
    }
  });
});

router.route("/questions/:id").delete((req, res) => {
  Questions.deleteOne({ _id: req.params.id }, (err, questions) => {
    if (err) {
      res.status(404).send("error occured while deleting");
    } else {
      res.send(`${req.params.id} deleted`);
    }
  });
});

router.put("/questions/:id", (req, res) => {
  if (req.body.id == "" || req.body.ques == "") {
    res.status(404).send("error occured while updating");
  } else {
    id: req.body.id;
    //  ques:req.body.ques;
  }
  Questions.updateOne({ id: req.params.id }, questions, (err, questions) => {
    if (err) {
      res.status(404).send("error occured while updating questions");
    } else {
      res.redirect(`/api/questions/${req.params.id}`);
    }
  });
});

//mapping options and answer with questions

router.route("/questions/map/:ans/:id").post((req, res) => {
  let ans, ques, opt;
  Answers.findOne({ ans: req.params.ans }, (err, data) => {
    if (data) ans = new Answers(data);
    else res.send("Ans not found");
  });

  Options.findOne({ _id: req.params.id }, (err, data) => {
    if (data) opt = new Options(data);
    else res.send("Option not found");
  });
  Questions.findOne({ _id: req.body }, (err, data) => {
    ques = new Questions(data);
    ques.answer.push(ans);
    ques.options.push(opt);
    ques
      .save()
      .then((reg) => {
        res.send(reg);
      })
      .catch((err) => {
        res.send("Failed to map", err);
      });
  });
});

module.exports = router;
