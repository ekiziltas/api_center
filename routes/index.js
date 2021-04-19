module.exports = function () {
    const express = require('express');
    const router = express.Router();
    const config = require('../config');

    const Timezones = require("./Timezones/index")(router);

    router.use(function (req, res, next) {
        let token = req.body.token || req.params.token || req.headers['x-access-token'];
        if (token === config.token) {
            next();
        } else {
            res.status(403).send({success: false, message: "No Token Provided"});
        }
    });

    //private endpoints
    router.use(Timezones);

    return router;

}