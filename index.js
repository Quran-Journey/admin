const https = require("https");
require("dotenv").config();
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

import { initializeApp } from 'firebase/app'; 
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

var port = process.env.BACKEND_PORT;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  console.log(`\nEndpoint Hit: ${req.originalUrl}\n`);
  next();
});

// firebaseConfig safe to include on client side 
const firebaseConfig = {
  apiKey: "AIzaSyAy_CLaAdFbgQDvSyLL5TNMT8C7am0D8YA",
  authDomain: "quran-journey-1fd78.firebaseapp.com",
  projectId: "quran-journey-1fd78",
  storageBucket: "quran-journey-1fd78.appspot.com",
  messagingSenderId: "796605473866",
  appId: "1:796605473866:web:85377ab12c380f6095b2b3",
  measurementId: "G-GP67NYJ27K"
};

const firebase_app = initializeApp(firebaseConfig); // create Firebase app that stores configuration of project
const auth = getAuth(firebaseConfig);
const db = getFirestore(firebaseConfig);
const analytics = getAnalytics(firebase_app);



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
