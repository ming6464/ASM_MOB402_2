const db = require("./db");

const productSchema = new db.mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   amount: {
      type: Number,
      required: true,
   },
   image: {
      type: String,
   },
   color: {
      type: String,
   },
   category: {
      type: String,
   },
});

const model = db.mongoose.model("product", productSchema);
module.exports = model;
