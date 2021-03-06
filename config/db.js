const mongoose = require("mongoose");
const config = require("config");

let db;
if (process.env.NODE_ENV === "production") {
  db = process.env.MONGO_URI;
} else {
  db = config.get("mongoURI");
}

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(e => {
      console.error(e.message);
      process.exit(1);
    });
};

module.exports = connectDB;
