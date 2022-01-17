const Product = require("../models/Product");

// exports.getAll = () => Product.find().sort({ createdAt: "desc" });
exports.getAll = () => Product.find().lean();

exports.getOne = (id) => Product.findById(id).lean();

exports.updateOne = (productId, productData) =>
  Product.findByIdAndUpdate(productId, productData);

exports.delete = (productId) => Product.findByIdAndDelete(productId);

exports.create = (productData) => Product.create(productData);
