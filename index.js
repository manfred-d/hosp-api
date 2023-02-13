const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const colors = require('colors');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
/*------------------------------------------end of dependencies--------------------------------------------------*/
/*------------------------------------------setting up server----------------------------------------------*/
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
const PORT = process.env.PORT
/*------------------------------------------end of setting up server----------------------------------------------*/
/*------------------------------------------setting up database----------------------------------------------*/
const connectDatabase = require('./database/config');
connectDatabase();

// routes
app.use("/api", require("./routes"));
// app.use("/api/doctor", require("./routes/Doctor"));
// app.use("/api/report", require("./routes/Report"));


// listening port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.underline);
});
