const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const expressAsyncHandler = require('express-async-handler');
const Hospital = require('../models/hospitalSchema');
const userRegister = expressAsyncHandler(async (req, res) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
            contacts: req.body.contacts,
            password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user);

    } catch (error) {
        throw new Error(error);
    }
});


const userLogin = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("User not found");

        //validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Invalid Credentials");
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            dob: user.dob,
            contacts: user.contacts,
        });

    } catch (error) {
        res.status(400)
        throw new Error(error);
    }
});

const individualUser = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.param.id).select("-password");
        res.status(200).json({ user });
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
});

const updateUser = expressAsyncHandler(async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json(hospital);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});


module.exports = { userRegister, userLogin, updateUser, individualUser };
