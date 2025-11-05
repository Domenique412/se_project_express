const User = require("../models/user");
const { handleUserError, handleError } = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(201).send(users))
    .catch((err) => handleUserError(err, res));
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => handleUserError(err, res));
};

const getUserId = (req, res) => {
  const { userId } = req.params.userId;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => handleError(err, res));
};

module.exports = { getUsers, createUser, getUserId };
