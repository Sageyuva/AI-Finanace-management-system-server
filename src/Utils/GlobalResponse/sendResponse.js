const sendResponse = (res, code, message, data) => {
    return res.status(code).json({
        code,
        message : message || "Success",
        data : data || null,
        success : true,
    })
}
module.exports = sendResponse