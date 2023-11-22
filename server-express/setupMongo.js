//setupMongo.js

const mongoose = require("mongoose");
const uri ="mongodb+srv://karthik:dupMhp8ABc0eVvLp@webdemo.jd9h1ip.mongodb.net/?retryWrites=true&w=majority";
function connect() {
  const options = { useNewUrlParser: true };
  mongoose.connect(uri, options).then(
    () => {
      console.log("Database connection established!");
    },
    (err) => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );
}
module.exports = connect;
 