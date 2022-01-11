const { JWT_SECRET } = require("../config/constants");
const jwt = require("jsonwebtoken");
// const jwt = require('../utils/jwt');
const User = require("../models/User");

exports.auth = function (req, res, next) {
  const token = req.get("X-Authorization");

  if (!token) {
    return res.status(401).send({
      message: "Missing Authorization header"
    });
  }

  // console.log("Token", token)
  function verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  }
  try {
    verifyToken(token).then((data) => {
      User.findById(data._id)
        .then((user) => {
          req.user = user;

          next();
        })
        .catch((err) => {
          next(err);
        });
    });
  } catch (error) {
    return res.status(401).send({
      message: "You are not allowed to do this"
    });
  }
};
