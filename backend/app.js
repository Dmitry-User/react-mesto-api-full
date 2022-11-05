require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const limiter = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const handleError = require('./middlewares/handle-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

mongoose.connect(MONGO_URL);

const app = express();

app.use(limiter({
  windowMs: 10 * 60 * 1000, // за 10 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
}));

app.use(cookieParser());
app.use(helmet());
app.use(express.json()); // встроенный метод, вместо body-parser

app.use(requestLogger); // логгер запросов
app.use(router);

app.use(errorLogger); // логгер ошибок
app.use(errors());
app.use(handleError);

app.listen(PORT);
