const jwt = require("jsonwebtoken");
// const config = require("../config/auth.config.js");
// const db = require("../models");
const models = require('../mongo');

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  let userId = req.headers["id"];
  models.UserModel.findById(userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if(user.roles.includes('admin')) {
      return res.status(200).json({'status': "UNAUTHORIZED", message: "Admin is not included in users roles."})
    } else {
      next()
    }
  });
};
isBlogger = (req, res, next) => {
  let userId = req.headers["id"];
  console.log(userId)
  models.UserModel.findById(userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if(user.roles.includes('blogger') || user.roles.includes('admin')) {
      return res.status(200).json({'status': "UNAUTHORIZED", message: "Admin is not included in users roles."})
    } else {
      next()
    }
  });
};

const authJwt = {
  verifyToken,
  isBlogger,
  isAdmin
};
module.exports = authJwt;
