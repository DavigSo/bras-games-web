require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express(); // Adicione os parênteses aqui
const errorMiddleware = require('./src/middleware/errorMiddleware');

app.use(errorMiddleware);
app.use(cors());
app.use(express.json());

// Db coneection
const conn = require('./src/db/conn');
conn();

// Routes
const routes = require('./src/routes/router');
app.use('/api', routes);

app.listen(8000, function () {
  console.log('Servidor Online!');
});
