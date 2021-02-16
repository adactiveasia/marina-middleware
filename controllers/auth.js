const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const ROld = db.role;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  User.findOne({ email: req.body.email })
    .exec((err, foundUser) => {
      if (err) {
        res.status(500).send({ message: err });
        return
      }

      if (!foundUser) {
        user.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({
            error: 0,
            message: "User was registered successfully!"
          });
        });
      } else {
        res.send({
          error: 1,
          message: "Email registered"
        });
      }
    })


};


exports.changePassword = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    const request = req.body;
    const user = await User.findByIdAndUpdate(req.user.id);
    if (request.password) {
      user.password = bcrypt.hashSync(request.password);
    }
  }

  user
    .save()
    .then(() => {
      res.status(201).json({
        error: 0,
        message: "password was added successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });

};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          error: 1,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      // for (let i = 0; i < user.roles.length; i++) {
      //     authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      // }
      res.status(200).send({
        error: 0,
        id: user._id,
        email: user.email,
        name: user.name,
        accessToken: token
      });
    });
}