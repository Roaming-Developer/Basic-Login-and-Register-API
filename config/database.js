const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully Contected to database");
    })
    .catch((error) => {
      console.log("Not successfully Contected to database");
      console.error(error);
    });
};
