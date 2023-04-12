// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api", function (req, res) {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

// your first API endpoint...
app.get("/api/:date_string", function (req, res) {
  const dateString = req.params.date_string;

  if (!dateString) {
    const dateObj = new Date();
    const unix = dateObj.getTime();
    const utc = dateObj.toUTCString();
    res.json({ unix: unix, utc: utc });
  } else if (!isNaN(dateString)) {
    const unix = parseInt(dateString);
    const utc = new Date(unix).toUTCString();
    res.json({ unix: unix, utc: utc });
  } else {
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      const unix = dateObj.getTime();
      const utc = dateObj.toUTCString();
      res.json({ unix: unix, utc: utc });
    }
  }
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
