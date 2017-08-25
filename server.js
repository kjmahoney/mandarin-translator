const sitePath = process.argv[2] || '.';
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(req.url);
  // next() with no arguments allows to pretend you didn't handle the route so that something else can pick it up instead.
  next();
});

app.use(express.static(__dirname + '/' + sitePath));

app.listen(4000);
