const axios = require("axios");
const url = "https://marinasquare.ascentis.com.sg/gateway";

exports.getAllDeals = async (req, res, next) => {
  const data = await axios.get(`${url}/api/Cms/GetAllDeals`);
  res.status(200).send(data.data)
};

exports.GetAllEvents = async (req, res, next) => {
  const data = await axios.get(`${url}/api/Cms/GetAllEvents`);
  res.status(200).send(data.data)
};

exports.GetContentList = async (req, res, next) => {
  const id = req.query.ContentId;  
  const data = await axios.get(`${url}/api/Cms/GetContentList?ContentId=${id}`);
  res.status(200).send(data.data)
};