require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
var fs = require('fs');


const cmsRoutes = require('./routes/cms');

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET'
  );
  next();
});

app.use('/api/Cms', cmsRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const { message, data } = error;
  return res.status(statusCode).json({ message, data });
});

app.listen('5000', () => console.log('App ready'));