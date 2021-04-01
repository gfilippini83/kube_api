const models = require('../mongo');

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    models.UserModel.findOne({
      username: req.body.data.username
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (user) {
        res.status(200).send({ message: "Failed! Username is already in use!", status: "FAILURE" });
        return;
      }
  
      // Email
      models.UserModel.findOne({
        email: req.body.data.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (user) {
          res.status(200).send({ message: "Failed! Email is already in use!", status: "FAILURE" });
          return;
        }
  
        next();
      });
    });
  };

  
  const verifySignUp = {
    checkDuplicateUsernameOrEmail
  };

  module.exports = verifySignUp;
  