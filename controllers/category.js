const utils = require("../utils/utils");
const Category = require("../models/category");
const User = require("../models/user");

exports.listAllCategories = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  const categories = await Category.find();
  res.status(200).send({
    data: categories,
  });
};

exports.addCategory = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  if (req.user) {
    const authUser = await User.findById(req.user.id);
    console.log(req.body);

    const category = new Category();
    category.name = req.body.name;
    category.description = req.body.description;
    category.siteId = req.body.siteId;
    category.modifiedBy = authUser ? authUser.email : null;
    category.createdBy = authUser ? authUser.email : null;
    category
      .save()
      .then(() => {
        res.status(201).json({
          error: 0,
          message: "Category was added successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.editCategory = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    const authUser = await User.findById(req.user.id);
    const category = await Category.findById(req.body.id);
    category.name = req.body.name;
    category.description = req.body.description;
    category.siteId = req.body.siteId;
    category.modifiedBy = authUser ? authUser.email : null;
    category.createdBy = authUser ? authUser.email : null;
    category
      .save()
      .then(() => {
        res.status(201).json({
          error: 0,
          message: "Category was updated successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.getCategory = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  if (req.user) {
    Category.findById(req.body.id)
      .populate("Category")
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

exports.deleteCategory = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    Category.findByIdAndDelete(req.query.id)
      .then(() => {
        res.status(201).json({
          error: 0,
          message: "Category was deleted successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};
