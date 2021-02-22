const utils = require('../utils/utils');
const Site = require('../models/site');

exports.listAllSites = (req, res, next) => {
    utils.authenticateJWT(req, res, next);
    const sites = await Site.find()
    res.status(200).send({
        data: sites
    })
};


exports.addSite = (req, res, next) => {
    utils.authenticateJWT(req, res, next);

    if (req.user) {
        const authUser = await User.findById(req.user.id);

        const site = new Site()
        site.name = req.body.name
        site.description = req.body.description
        site.organizationId = req.body.organizationId
        site.organizationName = req.body.organizationName
        site.modifiedBy = authUser ? authUser.email : null;
        site.createdBy = authUser ? authUser.email : null;
        site.save()
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
}

exports.editSite = (req, res, next) => {
    utils.authenticateJWT(req, res, next);
    if (req.user) {
        const authUser = await User.findById(req.user.id);
        const site = Site.findById(reqq.params.id)
        site.name = req.body.name
        site.description = req.body.description
        site.organizationId = req.body.organizationId
        site.organizationName = req.body.organizationName
        site.modifiedBy = authUser ? authUser.email : null;
        site.createdBy = authUser ? authUser.email : null;
        site.save()
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
}

exports.getSite = (req, res, next) => {
    utils.authenticateJWT(req, res, next);

  if (req.user) {
    Site.findById(req.body.id)
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
}


exports.deleteSite = async (req, res, next) => {
    utils.authenticateJWT(req, res, next);
    if (req.user) {
      Site.findByIdAndDelete(req.body.id)
        .then(() => {
          res.status(201).json({
            error: 0,
            message: "Site was deleted successfully!",
          });
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });
    }
  };