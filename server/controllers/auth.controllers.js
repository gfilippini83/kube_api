// const config = require("../config/auth.config");
// const db = require("../models");
const models = require('../mongo');
const User = require('../models/user')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  console.log(req.body)
  const user = new User({
    username: req.body.data.username,
    email: req.body.data.email,
    password: bcrypt.hashSync(req.body.data.password, 8),
    roles: req.body.data.roles
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!", status: "SUCCESS" });
  });
};

exports.signin = (req, res) => {
  console.log(req.body)
  models.UserModel.findOne({
    username: req.body.data.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found.", status: "FAILURE"  });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.data.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 86400 // 24 hours
      });

      // var authorities = [];

      console.log(user)
      // for (let i = 0; i < user.roles.length; i++) {
      //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      // }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        accessToken: token
      });
    });
};
