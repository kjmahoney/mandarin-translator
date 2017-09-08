const sitePath = process.argv[2] || '.';
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();
const port = 4000;

const idiomsArray = [
  {id: '0',
   chinese: '帅'
 },
  {id: '1',
  chinese: '难看'
  }
];
const id = 2;

// app.use(express.static(__dirname + '/' + sitePath));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.url);
  // next() with no arguments allows to pretend you didn't handle the route so that something else can pick it up instead.
  next();
});

app.get('/idioms', (req,res)=> {
  res.json(idiomsArray);
})

app.get('/idioms/:id', (req, res) => {
  let idiom = _.find(idiomsArray, {id: req.params.id});
  res.json(idiom || {});
})

app.listen(port, ()=>{
  console.log(`server running at ${port}`);
});
