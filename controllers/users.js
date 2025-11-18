const User = require("../models/user");
const { handleUserError, handleError } = require("../utils/errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => handleUserError(err, res));
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      return User.create({ name, avatar, email, password: hashedPassword });
    })
    .then((user) => {
      delete user._doc.password;
      res.status(201).send(user);
    })
    .catch((err) => handleUserError(err, res));
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => handleError(err, res));
};


const updateCurrentUser = (req, res) => {
  const userId = req.user._id;

  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    {
      new: true,
      runValidators: true
    }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => handleUserError(err, res));
};

const userLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.status(200).send({ token });
    })
    .catch((err) => handleUserError(err, res));
};

module.exports = { getUsers, createUser, getCurrentUser, userLogin, updateCurrentUser };
