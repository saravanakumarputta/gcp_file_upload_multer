var multer = require("multer");
var express = require("express");
var multerGoogleStorage = require("multer-google-storage");
var app = express();
var uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine({
    autoRetry: true,
    bucket: 'asia.artifacts.mymernstackapp.appspot.com',
    projectId: 'mymernstackapp',
    keyFilename: './mymernstackapp-28ff52c9b6ff.json',
    filename: (req, file, cb) => {
      cb(null, `/projectimages/${Date.now()}_${file.originalname}`);
    }
  })
});

app.post('/upload', uploadHandler.any(), function (req, res) {
  console.log(req.files);
  res.json(req.files);
});

app.listen(2000, (err) => {
  err ? console.log('Server Start Failed') : console.log('Server started');
})