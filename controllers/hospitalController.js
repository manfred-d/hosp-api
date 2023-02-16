const Hospitals = require("../models/hospitalSchema");
const Doctors = require("../models/doctorSchema");

const { sendNotification, playersId, externalUsersId } = require("./notificationController.js");
const expressAsyncHandler = require("express-async-handler");
const { updateParenthesizedType } = require("typescript");

const registerHospital = expressAsyncHandler(async (req, res) => {
    try {
        const { name, email, password, contact1, contact2 } = await req.body;
        const events = [];
        // data integrity
        if (!name || !email || !password || !contact1) {
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
        if (hospitalExists && (await hospitalExists.matchPassword(password))) {
            res.status(200).json({
                hospitalExists
            })
        } else { res.status(400).json({ message: "Invalid email or password" }) }
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
});

const allHospitals = expressAsyncHandler(async (req, res) => {
    try {
        const hospitals = await Hospitals.find({});
        res.status(200).json({
            hospitals,
        });
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
});

const individualHospital = expressAsyncHandler(async (req, res) => {
    try {
        const hospital = await Hospitals.findById(req.params.id).select("-password");
        res.status(200).json({
            hospital,
        });
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
});

const updateHospital = expressAsyncHandler(async (req, res) => {
    try {
        const hospital = await Hospitals.findById(req.params.id, {
            $set: req.body,
        });
        res.status(200).json(hospital);
    } catch (error) {
        throw new Error(error)
    }
});

const addService = expressAsyncHandler(async (req, res) => {
    try {
        const { topic, desc, serviceCharge } = req.body;
        const hospital = await Hospitals.findByIdAndUpdate(req.params.id, {
            $push: {
                services: {
                    topic,
                    des,
                    serviceCharge,
                },
            },
        });
        res.status(200).json(hospital);
    } catch (error) {
        throw new Error(error)
    }
});

const addEvents = expressAsyncHandler(async (req, res) => {
    try {
        const hospital = await Hospitals.findByIdAndUpdate(req.params.id, {
            $push: {
                events: {
                    eventName: req.body.eventName,
                    date: req.body.date,
                    desc: req.body.desc,
                    eventimg: req.body.eventimg,
                }
            }
        });
        await hospital.save();
        res.status(200).json(hospital);
    } catch (error) {
        throw new Error(error)
    }
});
//notification


const addDoctors = expressAsyncHandler(async (req, res) => {
    try {
        const hospital = await Hospitals.findById(req.params.id);
        const {
            name,
            exp,
            spec,
            contacts,
            email,
            date,
            doctorId,
            pic,
            docPassword,
        } = await req.body;
        if(!name || !exp || !spec || !contacts || !email || !date || !doctorId || !pic || !docPassword){
            res.status(400)
            throw new Error("Please fill all the fields");
        }
        const newDoctor = new Doctors({
            name,
            exp,
            spec,
            contacts,
            email,
            date,
            doctorId,
            pic,
            docPassword,
        });
        await newDoctor.save();
        hospital.doctors.push(newDoctor._id);
        await hospital.save();
        res.status(200).json(hospital);
    } catch (error) {
    }
});

const allDoctors = expressAsyncHandler(async (req, res) => {
    try {
        const hospital = await Hospitals.findById(req.params.id).populate("doctors");
        let a = [];
        for (let i = 0; i < hospital.doctors.length; i++) {
            const b = await Doctors.findById(hospital.doctors[i]).select("-docPassword");
            a.push(b);
        }
        res.status(200).json(a);
    } catch (error){
        throw new Error(error);
    }
});


const addContacts = expressAsyncHandler(async (req, res) => {
    try {
        const { name, number } = req.body;
        const hospital = await Hospitals.findByIdAndUpdate(req.params.id, {
            $push: {
                emergencyContacts: {
                    name,
                    number,
                },
            },
        });
        res.status(200).json(hospital);
    } catch (error) {
        throw new Error(error)
        // updateParenthesizedType
    }
});

const addBeds = expressAsyncHandler(async (req, res) => {
    try {
        const { total, occupied, empty } = await req.body;
        const hospital = await Hospitals.findByIdAndUpdate(req.params.id, {
            $push: {
                beds: {
                    total,
                    occupied,
                    empty,
                }
            }
        });
        res.status(200).json(hospital);
    } catch (error) {
        throw new Error(error);
    }
});

const addVacancy = expressAsyncHandler(async (req, res) => {
    try {
        const { status, position, desc, salary } = await req.body;
        const hospital = await Hospitals.findByIdAndUpdate(req.params.id, {
            $push: {
                vacancy: {
                    status,
                    position,
                    amount,
                    desc,
                }
            }
        });
        res.status(200).json(hospital);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

const bedTypes = expressAsyncHandler(async (req, res) => {
    try {
        const { icu, ventilator, other } = await req.body;
        const hospital = await Hospitals.findByIdAndUpdate(req.params.id, {
            $push: {
                bedTypes: {
                    icu,
                    ventilator,
                    other,
                }
            }
        });
        res.status(200).json(hospital);
    } catch (error) {
        res.status(400)
        throw new Error(error);
    }
});

const hospitalDetails = expressAsyncHandler(async (req, res) => {
    try {
        const hospital = await Hospitals.findById(req.params.id).select("-password");
        res.status(200).json(hospital);
    } catch (error) {
        res.status(400)
        throw new Error(error);        
    }
});


const hospitalReview = expressAsyncHandler(async (req, res) => {
    const { comment, userId, ratings, userName, profilePic} = await req.body;
    try {        
        const reviews = await Hospitals.findByIdAndUpdate(req.params.id, {
            $push: {
                reviews: {
                    comment,
                    userId,
                    ratings,
                    userName,
                    profilePic,
                }
            }
        }, { new: true });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

const allHospitalEvents = expressAsyncHandler(async (req, res) => {
    try {
        const hospitals = await Hospitals.findById().populate("events");
        let allEventsId = [];
        let allEvents = [];
        for (const hospital of hospitals) {
            if (hospital.events.length > 0) {
                for(const event of hospital.events){
                    allEventsId.push(event._id);
                }
            }
        }
        res.status(200).json(allEventsId);
    } catch (error) {
        
    }
});
module.exports = {
    registerHospital,
    loginHospital,
    individualHospital,
    updateHospital,
    addService,
    addEvents,
    addContacts,
    addDoctors,
    addBeds,
    addVacancy,
    bedTypes,
    allDoctors,
    hospitalDetails,
    allHospitals,
    hospitalReview,
    allHospitalEvents,
};
