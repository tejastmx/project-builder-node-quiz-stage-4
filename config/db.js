const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://quiz:root@cluster0.whj79.mongodb.net/quiz?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

module.exports = mongoose;
