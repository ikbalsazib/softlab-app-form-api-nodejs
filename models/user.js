const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        shopName: {
            type: String,
            required: true
        },
        shopType: {
            type: String,
            required: true
        },
        employee: {
            type: Number,
            required: true
        },
        interestedArea: {
            type: String,
            required: true
        },
        visitedBy: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: 'Welcome to Mission 2023!'
        },
        visitedDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);


const User = mongoose.model('User', userSchema);
module.exports = User;