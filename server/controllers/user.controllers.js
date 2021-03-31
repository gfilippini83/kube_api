const models = require('../mongo');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
exports.getById = (req, res) => {
  const id = req.params.id;
  console.log("HERE")
  models.UserModel.findById(id, function(err, result) {
    if(err) {
      res.status(404).send("User Not Found")
    }  else {
      res.status(200).json(result)
    }
  })
};