const Product = require("../models/Product");

// exports.getAll = () => Product.find().sort({ createdAt: "desc" });
exports.getAll = () => Product.find().lean();

exports.getOne = (id) => Product.findById(id);

exports.update = (id, productData) =>
  Product.findByIdAndUpdate(id, productData);

exports.delete = (id) => Product.findByIdAndDelete(id);

exports.create = (productData) => Product.create(productData);
