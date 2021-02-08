require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const { Client } = require("@elastic/elasticsearch");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const dbConfig = require("./config/db.config");

const client = new Client({
  node: "http://localhost:9200",
});

// const MONGODB_URI = `mongodb+srv://${dbConfig.USER}:${dbConfig.PASS}@analytics-0.qcbmn.mongodb.net/${dbConfig.DB_NAME}?retryWrites=true&w=majority`
const MONGODB_URI = `mongodb://localhost:27017/adsign`;

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const { message, data } = error;
  return res.status(statusCode).json({ message, data });
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen("5000", () => console.log("App ready"));
  })
  .catch((err) => console.log("ATLAS CONNECTION ERROR: ", err));
