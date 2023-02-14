const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDatabase = require('./database/config');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const app = express();

const { notFound, errorHandler } = require('./middlewares/errorMiddleware');


//routes
const hospitalRoutes = require('./routes/hospitalRoutes');
const userRoutes = require('./routes/userRoute');
const appointmentRoutes = require('./routes/appointmentRoute');
const doctorRoutes = require('./routes/doctorRoute');
const Reports = require('./routes/report');
const medicineRoutes = require('./routes/medicRoutes');

//middlewares
app.use(cors());
app.use(morgan('common'));
app.use(cookieParser());
app.use(expressValidator());
app.use(expressSession({}));
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/api/hospitals", hospitalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/reports", Reports);
app.use("/api/medicines", medicineRoutes);



connectDatabase();

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`.bold.yellow)});
