// Require Main Modules..
const {
    validationResult
} = require('express-validator/check');
const bcrypt = require('bcryptjs');
// Json Web Token Module..
const jwt = require('jsonwebtoken');

// Require Post Schema from Model..
const User = require('../models/user');

// Registration User..
const userRegistration = (req, res, next) => {
    const errors = validationResult(req);
    // Check Input validation Error with Error Handelar..
    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    // Check Image validation Error with Error Handelar..
    if (!req.file) {
        const error = new Error('No Image Provided!');
        error.statusCode = 422;
        throw error;
    }
    // Main..
    const baseurl = req.protocol + '://' + req.get("host");
    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const shopName = req.body.shopName;
    const shopType = req.body.shopType;
    const employee = req.body.employee;
    const interestedArea = req.body.interestedArea;
    const visitedBy = req.body.visitedBy;
    const description = req.body.description;
    const visitedDate = req.body.visitedDate;
    const imageUrl = baseurl + "/images/" + req.file.filename;
    // const imageUrl = req.body.imageUrl;

    const user = new User({
        email: email,
        name: name,
        phone: phone,
        address: address,
        shopName: shopName,
        shopType: shopType,
        employee: employee,
        interestedArea: interestedArea,
        visitedDate: visitedDate,
        visitedBy: visitedBy,
        imageUrl: imageUrl,
        description: description,
    
    });

    User.findOne({
            email: email
        })
        .then(userExists => {
            if (userExists) {
                const error = new Error('A user with this email or facebook id is already resigtered!');
                error.statusCode = 401;
                throw error;
            } else {
                return user.save();
            }
        })
        .then(newUser => {
            res.status(200).json({
                message: 'User Registration Success!',
                userId: newUser._id
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

const allUserLists = async (req, res, next) => {

    const allUser = await User.find();

    res.status(200).json({
        users: allUser,
        message: 'Successfully get all users'
    });
}

// GET Single Post By Slug Controller..
const getRegistrationDetails = (req, res, next) => {
    // Get Id From router..
    const id = req.params.regId;
    User.findById(id)
        .then(user => {
            // When This Post are not available with Error Handelar..
            if (!user) {
                const error = new Error('Sorry! This user is not available.');
                error.statusCode = 404;
                throw error;
            }
            // Main Response..
            res.status(200).json({
                user: user,
                message: 'Succesfully Get The User.'
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

// Exports All Function..
exports.userRegistration = userRegistration;
exports.allUserLists = allUserLists;
exports.getRegistrationDetails = getRegistrationDetails;
