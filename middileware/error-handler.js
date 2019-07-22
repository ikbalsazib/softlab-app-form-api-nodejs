exports.extra = ((error, req, res, next) => {
    // console.log(error);
    const status = error.status || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({
        message: message,
        errorData: data
    });
});