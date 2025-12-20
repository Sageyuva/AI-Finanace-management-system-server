// middlewares/globalErrorHandler.js
const sendErrorResponse = require('../Utils/GlobalResponse/sendErrorResponse');

// Express recognizes this as an Error Handler because it has 4 arguments
const globalErrorHandler = (err, req, res, next) => {
    // THIS is where we call your function
    sendErrorResponse(err, res);
};

module.exports = globalErrorHandler;