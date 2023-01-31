//making the hospital api
const express = require('express');
const path = require("path");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const {errorHandler} = require("./handlers/errorHandler");
const PORT = process.env.PORT;
console.log(process.env.PORT);
const server = express();

server.use(cors());
server.use(express.json());
server.use(errorHandler);


server.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}`)});
