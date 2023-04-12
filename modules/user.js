const db = require("./db");

const userSchema = new db.mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   image: {
      type: String,
   },
   role: {
      type: String,
      lowercase: true,
   },
});

const model = db.mongoose.model("user", userSchema);
module.exports = model;
