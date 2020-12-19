const express = require("express");
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var { Options } = require("../model/Option");

router.route("/options").post((req, res) => {
    if (req.body.opt == "") {
      res.status(404).send("please enter question");
    } else {
      var options = new Options(req.body);
      options
        .save()
        .then((options) => res.send(options))
        .catch((err) =>
          res.status(400).send("error occured while posting options")
        );
    }
  });
  
  router.route("/options").get((req, res) => {
    
    Options.find((err, options) => {
      if (err) {
        res.status(404).send("error occured while posting options");
      } else {
        res.send(options);
      }
    });
  });
  
  router.route("/options/:id").get((req, res) => {
    Options.findOne({ id: req.params.id }, (err, options) => {
      if (err) {
        res.status(404).send("error occured while posting options");
      } else {
        res.send(options);
      }
    });
  });
  
  router.route("/options/:id").delete((req, res) => {
    Options.deleteOne({ _id: req.params.id }, (err, options) => {
      if (err) {
        res.status(404).send("error occured while deleting");
      } else {
        res.send(`${req.params.id} deleted`);
      }
    });
  });
  
  router.put("/options/:id", (req, res) => {
    if (req.body.id == "" || req.body.ques == "") {
      res.status(404).send("error occured while updating");
    } else {
      id: req.body.id;
      //  ques:req.body.ques;
    }
    Options.updateOne({ id: req.params.id }, options, (err, options) => {
      if (err) {
        res.status(404).send("error occured while updating options");
      } else {
        res.redirect(`/api/options/${req.params.id}`);
      }
    });
  });
  module.exports = router;
  