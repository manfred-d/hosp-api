let https = require("https");
const OneSignal = require("onesignal-node");
const API_KEY = process.env.ONE_SIGNAL;
const APP_ID = process.env.APP_ID;
const client = new OneSignal.Client(APP_ID, API_KEY);

var playersId = [];
var externalUserId = [];
client.viewDevices()
    .then((response) => {
        //console.log(response.body);
        let result = response.body.players;
        result.map((res) => {
            playersId.push(res.id);
            externalUserId.push(res.external_user_id);
        });
    })
    .catch((e) => {
        console.log(e)
    });


// appointments notifications

var sendNotification = function (data) {
    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${API_KEY}`
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers,
    };

    var req = https.request(options, function (res) {
        res.on("data", function (data) {
            JSON.parse(data);
        });
    });

    req.on("error", function (e) {
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
};
module.exports = { sendNotification, playersId, externalUserId };
