const { NextFunction } = require("express");
 const errorHandler = (
    err,
    req,
    res,
    next
) => {
    console.error(err);
    res.status(500).send({ message: "Unhandled server error"});
}

module.exports = {
    errorHandler,
}
