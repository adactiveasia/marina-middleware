require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
var fs = require('fs');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const siteRoutes = require('./routes/site');
const organizationRoutes = require('./routes/organization');
const poiRoutes = require('./routes/poi');
const poiCategoryRoutes = require('./routes/poiCategory');
const categoryRoutes = require('./routes/category');
const mediaRouter = require('./routes/media');
const mapRouter = require('./routes/map');
const feedbackRouter = require('./routes/feedback');
const respondentRouter = require('./routes/respondent');
const screenshotRouter = require('./routes/screenshot');
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

const dbConfig = require('./config/db.config');

// const MONGODB_URI = `mongodb+srv://${dbConfig.USER}:${dbConfig.PASS}@analytics-0.qcbmn.mongodb.net/${dbConfig.DB_NAME}?retryWrites=true&w=majority`
// const MONGODB_URI = `mongodb://10.42.93.31:27017/adsign`;
const MONGODB_URI = `mongodb://172.31.44.93:27017/adsign`;
// const MONGODB_URI = `mongodb://127.0.0.1:27017/adsign`;

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
  })
);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = req.body.path ? req.body.path : '';
    if (!fs.existsSync('images/' + path)) {
      fs.mkdirSync('images/' + path, { recursive: true });
    }
    cb(null, `images/${path}`);
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'video/mp4'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: fileStorage, fileFilter }).single('file'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  next();
});

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/site', siteRoutes);
app.use('/organization', organizationRoutes);
app.use('/poi', poiRoutes);
app.use('/poiCategory', poiCategoryRoutes);
app.use('/category', categoryRoutes);
app.use('/media', mediaRouter);
app.use('/map', mapRouter);
app.use('/feedback', feedbackRouter);
app.use('/respondent', respondentRouter);
app.use('/screenshot', screenshotRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const { message, data } = error;
  return res.status(statusCode).json({ message, data });
});

mongoose.set('useFindAndModify', false);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen('5000', () => console.log('App ready'));
  })
  .catch((err) => console.log('ATLAS CONNECTION ERROR: ', err));
