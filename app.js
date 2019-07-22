/**
 * Error Status Code 422 mean Validation Error
 */
// Main Module Required..
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Main User Router File..
const userRoutes = require('./routes/user');

// Cross Unblocker File..
const crossUnblocker = require('./middileware/cros-unblocker');
// Custom Error Hanndler..
const errorHandler = require('./middileware/error-handler');

// Main Express App Variable..
const app = express();

// For Image Upload Type with Mime..
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}
// Main Image Storage Loacation and name..
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + extension);
    }
});
// File Filter with mime Type..
const fileFilter = (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    if (isValid) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


// BodyParser Middleware for request data extractor..
app.use(bodyParser.json());
// CROS Unblocker Middleware..
app.use(crossUnblocker.allowCross);

// Static Image Path Folder..
app.use('/images', express.static(path.join(__dirname, 'images')));
// Use Multer Middleware For Image Upload..
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));


//Router Request Handeler..
app.use('/api/user', userRoutes);


//Error Handelar..
app.use(errorHandler.extra);

//MongoDB Connection..
mongoose.connect('mongodb://localhost:27017/softlab-app-registration', {
        useNewUrlParser: true
    })
    .then(() => {
        // For Main Server..
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server is running at port:${port}`));
        console.log('Connect to Local mongoDB');
    })
    .catch(err => {
        console.error('Opps! Could not connect to mongoDB Cluster0', err);
    })