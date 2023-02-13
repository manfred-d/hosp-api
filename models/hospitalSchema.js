const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    contact1: {
        type: String,
        required: true,
    },
    contact1: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        min: 8,
        required: true,
    },
    services: [
        {
            topic: {
                type: String,
            },
            desc: String,
            serviceCharge: Number,
            serviceImg: String,
        },
    ],
    hospitalImages: [{
        img: {
            type: String,
        }
    }],
    hospitalProfilePic: {
        type: String
    },
    hospitalDescription: {
        type: String,
    },
    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors",
    }],

    emergencyContacts: [
        {
            name: {
                type: String,
            },
            number: {
                type: Number
            }
        }
    ],

    ambulance: Number,

    beds: {
        total: Number,
        occupied: Number,
        empty: Number,
    },
    bedTypes: {
        icu: Number,
        ventilator: Number,
        other: Number
    },

    vacancy: [
        {
            status: Boolean,
            position: String,
            amount: Number,
            desc: String,
        },
    ],

    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointments",
        },
    ],

    reviews: [
        {
            comment: String,
            userId: String,
            userName: String,
            profilePic: String,
            date: {
                type: Date,
                default: Date.now,
            },
            ratings: {
                type: Number,
                max: 5,
            },
        },
    ],

    patient: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
    ],
    events: [
        {
            eventName: String,
            date: Date,
            desc: String,
            eventImg: String,
        },
    ],   
}, {timestamps: true});
