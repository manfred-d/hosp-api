const User = require("../models/userSchema");
const Hospitals = require("../models/hospitalSchema");
const Appointments = require("../models/appointmentSchema");
let https = require("https");

const { sendNotification, playersId, externalUserId } = require("./notificationController.js");
const expressAsyncHandler = require("express-async-handler");

const appointmentDetails = expressAsyncHandler(async (req, res) => {
    try {
        const hospitals = await Hospitals.find({ _id: req.params.id });
        const {
            name,
            age,
            location,
            contact,
            patient,
            date,
            services,
            desc,
        } = await req.body;

        if (!name || !contact || !location) {
            res.status(400);
            throw new Error("Please Fill All The Fields");
        }
        const newAppointment = new Appointments({
            name,
            age,
            location,
            contact,
            patient,
            date,
            email,
            services,
            desc,
            withHospital: req.params.id,
        });
        await newAppointment.save();
        hospitals.Appointments.push(newAppointment._id);
        hospitals.save();
        res.status(200).json(newAppointment);
    } catch (error) {
        res.status(400);
        throw new Error(Error);
    }
});


// filter by hospital
const eachHospitalAppointment = expressAsyncHandler(async (req, res) => {
    try {
        const hospital = await Hospitals.findById(req.params.id);
        let a = [];
        for (let i = 0; i<hospital.Appointments.length; i++) {
            const b = await Appointments.findById(hospital.Appointments[i]);
            a.push(b);
        }
        res.status(200).json(a);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

// filter by each appointment
const eachAppointmentDetails = expressAsyncHandler(async (req, res) => {
    try {
        const appointment = await Appointments.findById(req.params.id);
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

// appointment approval
const approveAppointment = expressAsyncHandler(async (req, res) => {
    try {
        const appointment = await Appointments.findByIdAndUpdate(req.params.id, {
            appointDate: req.body.date,
            token: req.body.token,
            docArrival: req.body.doctime,
            assignedDoctor: req.body.assignedDoc,
            status: { pending: false, done: true, rejected: false },
        });

        let message = {
            app_id: "561ab6-221eaf44",
            contents: {
                en: ` Your Appointment Has been Scheduled Succesfully on ${req.body.appointDate},
                with Doctor ${req.body.assignedDoc}, your token is ${req.body.token}`,
            },
            haeadings: {
                en: "Dr John Doe"
            },
            include_external_user_ids:
                externalUserId,
        };

        await sendNotification(message);
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
