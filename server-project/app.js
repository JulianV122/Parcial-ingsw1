const express = require("express");
const cors = require('cors');

const app = express();

const API_VERSION = 'api/v1'

const userRoutes = require("./routes/user");

app.use(cors());

app.use(express.json());

app.use (`/${API_VERSION}/user`, userRoutes);

/* http://localhost:3100/api/v1/user/signin  */




module.exports = app;
