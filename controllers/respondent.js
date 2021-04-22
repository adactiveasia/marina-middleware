const db = require("../models");
const Respondent = db.respondent;
const utils = require("../utils/utils");
const _ = require("underscore");
const moment = require("moment");
const Feedback = require("../models/feedback");

exports.create = async (req, res, next) => {
  const checkFirst = await Feedback.findById(req.body.feedbackId);
  if (!checkFirst.start || !checkFirst.end) {
    res.status(400).json({
      message: "Cannot send feedback because the date is not setted!",
    });
  } else {
    const respondent = new Respondent({
      feedbackId: req.body.feedbackId,
      star: req.body.star,
    });

    respondent.save((err, org) => {
      if (err) {
        res.status(500).send({ message: err, data: respondent });
        return;
      }
      res.status(201).send({
        error: 0,
        message: "Respondent was added successfully!",
        data: respondent,
      });
    });
  }
};

exports.get = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  if (req.user) {
    const respondent = await Respondent.find({ feedbackId: req.query.id });
    const totalRespondent = respondent.length;
    const avgRespondent = _.reduce(
      respondent,
      (num, item) => {
        return item.star + num;
      },
      0
    );

    const label = [];
    const dataSet = {
      star1: [],
      star2: [],
      star3: [],
      star4: [],
      star5: [],
    };

    const respondentMap = _.mapObject(
      _.groupBy(respondent, (item) => {
        return moment(item.createdAt).format("DD/MM/YYYY");
      }),
      (data, index) => {
        label.push(index);
        const findStar1 = data.filter((item) => item.star === 1);
        const findStar2 = data.filter((item) => item.star === 2);
        const findStar3 = data.filter((item) => item.star === 3);
        const findStar4 = data.filter((item) => item.star === 4);
        const findStar5 = data.filter((item) => item.star === 5);
        dataSet.star1.push(findStar1 ? findStar1.length : 0);
        dataSet.star2.push(findStar2 ? findStar2.length : 0);
        dataSet.star3.push(findStar3 ? findStar3.length : 0);
        dataSet.star4.push(findStar4 ? findStar4.length : 0);
        dataSet.star5.push(findStar5 ? findStar5.length : 0);
      }
    );

    return res.json({
      data: {
        dataSet,
        labels: label,
        total: totalRespondent,
        average: avgRespondent / totalRespondent,
      },
    });
  }
};
