const express = require("express");
const router = express.Router();

router.use(async (req, res, next) => {
    res.status(404);
    // respond with html page
    if (req.accepts("html")) {
        //res.send("html not found");
        let vars = {};
        vars.url = req.url;
        vars.title = "Page Not Found";
        vars.bounceLink = req.header("Referer") || "/";
        res.render("misc/error404", vars);
        return;
    }
    // respond with json
    if (req.accepts("json")) {
        //res.send("json not found");
        res.send({ error: "Not-found" });
        return;
    }
    // default to plain-text. send()
    res.type("txt").send("Not=found");
})

module.exports = router;