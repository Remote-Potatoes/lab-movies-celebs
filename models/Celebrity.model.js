//  Add your code here
// const mongooose = require("mongoose");
// const { Schema, model } = mongoose;
const { Schema, model } = require("mongoose");

const celebSchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

const Celeb = model("Celeb", celebSchema);

module.exports = Celeb;
