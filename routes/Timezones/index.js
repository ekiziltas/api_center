module.exports = function (router) {
    const all = require("./all.json");

    // Timezones Endpoints
    router.get('/countries', function (req, res) {
        let countries = [];
        countries = all.map((item) => {
            return {
                id: item.alpha2Code,
                name: item.name
            };
        })
        if (countries.length === 0)
            return res.status(400).send({code: 1, msg: "not_found_error"});
        return res.status(200).send({code: 0, msg: "Success", data: countries});
    });

    router.get('/countries/:id', function (req, res) {
        let country = {};
        if (!req.params.id) return res.status(400).send({code: 1, msg: "not_found_error"});
        country = all.filter((item) => {
            if (req.params.id === item.alpha2Code) return item;
        })
        if (Object.keys(country).length === 0)
            return res.status(400).send({code: 1, msg: "not_found_error"});
        return res.status(200).send({code: 0, msg: "Success", data: country});
    });

    router.get('/timezones', function (req, res) {
        let timezones = [];
        timezones = all.map((item) => {
            return {
                name: item.name,
                timezones: item.timezones
            };
        })
        if (timezones.length === 0)
            return res.status(400).send({code: 1, msg: "not_found_error"});
        return res.status(200).send({code: 0, msg: "Success", data: timezones});
    });

    router.get('/timezones/:id', function (req, res) {
        let timezone = {};
        if (!req.params.id) return res.status(400).send({code: 1, msg: "not_found_error"});
        timezone = all.filter((item) => {
            if (req.params.id === item.alpha2Code)
                return true;
        })[0]
        if (Object.keys(timezone).length === 0)
            return res.status(400).send({code: 1, msg: "not_found_error"});
        return res.status(200).send({
            code: 0,
            msg: "Success",
            data: {id: timezone.alpha2Code, timezones: timezone.timezones}
        });
    });

    return router;
}
