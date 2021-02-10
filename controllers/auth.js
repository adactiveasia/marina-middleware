const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const ROld = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  User.findOne({ email: req.body.email }).exec((err, foundUser) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!foundUser) {
      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({
          error: 0,
          message: "User was registered successfully!",
        });
      });
    } else {
      res.send({
        error: 1,
        message: "Email registered",
      });
    }
  });
};

exports.signin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(422).json({
      errors: {
        email: [
          {
            msg: "User not found",
          },
        ],
      },
    });
  } else {
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(422).json({
        errors: {
          password: [
            {
              msg: "Invalid password",
            },
          ],
        },
      });
    } else {
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        error: 0,
        id: user._id,
        email: user.email,
        name: user.name,
        organizationId: user.organizationId,
        organizationName: user.organizationName,
        access: user.access,
        accessToken: token,
        isAdmin: user.isAdmin,
      });
    }
  }
};
