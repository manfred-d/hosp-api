const Hospitals = require("../models/hospitalSchema");
const Doctors = require("../models/doctorSchema");

const { sendNotification, playersId, externalUsersId } = require("./notificationController.js");
const expressAsyncHandler = require("express-async-handler");

const registerHospital = expressAsyncHandler(async (req, res) => {
    try {
        const { name, email, password, contact1, contact2 } = await req.body;
        const events = [];
        // data integrity
        if(!name || !email || !password || !contact1) {
            res.status(400)
            throw new Error("Please fill all the fields");
        }
        //check if hospital already exists
        const hospitalExists = await Hospitals.findOne({ email });

        if (!hospitalExists) {
            const newHospital = new Hospitals({
                name,
                email,
                password,
                contact1,
                contact2,
                events,
            }).save((err, hospital) => {
                if (err) {
                    res.status(400);
                    throw new Error("Error in saving hospital");
                }
                if (hospital) {
                    res.status(200).json({
                        hospital,
                    });
                }
            });
        } else {
            res.status(400);
            throw new Error("Hospital already exists");
        }
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
});
const loginHospital = expressAsyncHandler(async (req, res) => {
    try {
        const { email, password } = await req.body;
        // data integrity
        if (!email || !password) {
            res.status(400)
            throw new Error("Please fill all the fields");
        }
        //check if hospital already exists
        const hospitalExists = await Hospitals.findOne({ email });
        if(hospitalExists && (await hospitalExists.matchPassword(password))) {
            res.status(200).json({
                hospitalExists
            })
        } else { res.status(400).json({message: "Invalid email or password"})}
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
});
