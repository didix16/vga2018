const express = require("express");
const app = express();

let controller = {

    "url1" : {

        "url": "/",
        "method": "get",
        "callback": function (req, res) {
            res.send("home");
        }
    },

    "url2": {

        "url": "/profile/:username",
        "method": "get",
        "callback": function (req, res) {
            res.send(`hi ${req.params.username}`);
        }
    }
};

for(let u in controller){

    let conf = controller[u];
    app[conf.method](conf.url, conf.callback);
}

app.listen(3000);