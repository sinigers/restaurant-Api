const mongoose = require("mongoose");
const validator = require("validator");
mongoose.set("runValidators", true);

let productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2
    },
    body: {
      type: String,
      required: false,
      minlength: 2
    },
    alergens: {
      type: String,
      required: false
    },
    quantity: {
      type: Number,
      default: 1
    },
    weight: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    imageURL: {
      type: String,
      required: false
    },
    priceSale: {
      type: Number,
      default: 0
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

let Product = mongoose.model("Product", productSchema);

module.exports = Product;
