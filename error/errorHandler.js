function errorHandler(err, req, res, next) {
  
    const statusCode = err.status || err.statusCode || 500;
    const message = err.message || (statusCode === 404 ? "Route not found" : "Internal Server Error");


    res.status(statusCode).json({
        status: "error",
        message,
        path: req.originalUrl,
        method: req.method,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
}


function notFoundHandler(req, res, next) {
    const error = new Error(`Hy!, are you missing a route? The requested route '${req.originalUrl}' does not exist on this server`);
    error.status = 404;
    next(error); 
}

module.exports = {
    errorHandler,
    notFoundHandler
};