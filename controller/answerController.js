const express = require("express");
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var { Answers } = require("../model/Answer");

router.route("/answers").post((req, res) => {
  if (req.body.opt == "") {
    res.status(404).send("please enter question");
  } else {
    var answers = new Answers(req.body);
    answers
      .save()
      .then((answers) => res.send(answers))
      .catch((err) =>
        res.status(400).send("error occured while posting answers")
      );
  }
});

router.route("/answers").get((req, res) => {
  Answers.find((err, answers) => {
    if (err) {
      res.status(404).send("error occured while posting answers");
    } else {
      res.send(answers);
    }
  });
});

router.route("/answers/:id").get((req, res) => {
  Answers.findOne({ id: req.params.id }, (err, answers) => {
    if (!ObjectId.isValid(req.params.id)) {
      res
        .status(404)
        .json({ error: "answer with the specified ID does not exist." });
    } else if (err) {
      res.status(404).send("error occured while posting answers");
    } else {
      res.send(answers);
    }
  });
});

router.route("/answers/:id").delete((req, res) => {
  Answers.deleteOne({ _id: req.params.id }, (err, answers) => {
    if (err) {
      res.status(404).send("error occured while deleting");
    } else {
      res.send(`${req.params.id} deleted`);
    }
  });
});

router.put("/answers/:id", (req, res) => {
  if (req.body.id == "" || req.body.ques == "") {
    res.status(404).send("error occured while updating");
  } else {
    id: req.body.id;
    //  ques:req.body.ques;
  }
  Answers.updateOne({ id: req.params.id }, answers, (err, answers) => {
    if (err) {
      res.status(404).send("error occured while updating answers");
    } else {
      res.redirect(`/api/answers/${req.params.id}`);
    }
  });
});
module.exports = router;
