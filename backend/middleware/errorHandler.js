
export default function errorHandler(err, req, res, next) {
    console.error(err.message);
    res.status(400).json({
        "message": "Invalid user details",
        "error": err.message
    });
}