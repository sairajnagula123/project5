// middleware/commonMiddleware.js


// LOGGER
export const logger = (req, res, next) => {

    console.log("Method:", req.method);

    console.log("URL:", req.url);

    console.log("Time:", new Date());

    next();
};




// ERROR HANDLER
export const errorHandler = (err, req, res, next) => {

    console.log("Error:", err.message);

    res.status(500).json({
        message: "Something went wrong",
        error: err.message
    });
};