const sendErrorResponse = (err, res) => {
    // 1. Define the variable FIRST
    const statusCode = err.statusCode || 500; 
    const message = err.message || "Internal server error";

    // 2. Now use 'statusCode', not 'code'
    return res.status(statusCode).json({
        code: statusCode, 
        message: message,
        data: null,
        success: false,
    });
};

module.exports = sendErrorResponse;