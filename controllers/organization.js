const utils = require("../utils/utils");
const Organization = require("../models/organization");
const User = require("../models/user");

exports.listAllOrganizations = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  const organizations = await Organization.find();
  res.status(200).send({
    data: organizations,
  });
};

exports.addOrganization = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  if (req.user) {
    const authUser = await User.findById(req.user.id);

    const organization = new Organization();
    organization.name = req.body.name;
    organization.description = req.body.description;
    organization.modifiedBy = authUser ? authUser.email : null;
    organization.createdBy = authUser ? authUser.email : null;
    organization
      .save()
      .then(() => {
        res.status(201).json({
          error: 0,
          message: "User was added successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.editOrganization = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    const authUser = await User.findById(req.user.id);
    const organization = await Organization.findById(req.params.id);
    organization.name = req.body.name;
    organization.description = req.body.description;
    organization.modifiedBy = authUser ? authUser.email : null;
    organization.createdBy = authUser ? authUser.email : null;
    organization
      .save()
      .then(() => {
        res.status(201).json({
          error: 0,
          message: "User was added successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.getOrganization = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  if (req.user) {
    Organization.findById(req.body.id)
      .populate("Organization")
      .then(async (user) => {
        res.status(200).json({
          data: user,
          error: 0,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.deleteOrganization = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    Organization.findByIdAndDelete(req.query.id)
      .then(() => {
        res.status(201).json({
          error: 0,
          message: "Organization was deleted successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};
