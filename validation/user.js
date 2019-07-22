const { body } = require('express-validator/check');

// For User Registration..
exports.checkUserRegInput = [
    // body('email').isEmail().withMessage('Please enter a valid email!')
    // body('name').trim().not().isEmpty().withMessage('Name required!'),
    // body('phone').trim().not().isEmpty().withMessage('Phone no required!'),
    // body('address').trim().not().isEmpty().withMessage('Address required!'),
    // body('shopName').trim().not().isEmpty().withMessage('Shop name required!'),
    // body('shopType').trim().not().isEmpty().withMessage('Shop type required!'),
    // body('interestedArea').trim().not().isEmpty().withMessage('Interested Area required!'),
    // body('visitedBy').trim().not().isEmpty().withMessage('Visitor Name is required!')
];