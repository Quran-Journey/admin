const https = require("https");
require("dotenv").config();
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
// Import auth routes here

var port = process.env.BACKEND_PORT;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  console.log(`\nEndpoint Hit: ${req.originalUrl}\n`);
  next();
});

// Use auth routes here

if (process.env.NODE_ENV == "production") {
  // This sets the options for https so that it finds the ssl certificates
  var privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/offlinequran.org-0001/privkey.pem"
  );
  var certificate = fs.readFileSync(
    "/etc/letsencrypt/live/offlinequran.org-0001/cert.pem"
  );
  var chain = fs.readFileSync(
    "/etc/letsencrypt/live/offlinequran.org-0001/fullchain.pem"
  );
  const httpsOptions = {
    cert: certificate,
    key: privateKey,
    ca: chain,
  };

  https.createServer(httpsOptions, app).listen(port, () => {
    console.log("Serving on https");
  });
} else if (process.env.NODE_ENV == "development") {
  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
}
