//making the hospital api
const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const server = express();


server.listen(`Listening on port ${PORT}`)
