const sitePath = process.argv[2] || '.';
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();
const port = 4000;
const hbs = require('hbs');
const mongoose = require('./db/connection');
const models = require('./db/models');
const Word = mongoose.model('Word');

app.set("view engine", "hbs")
app.use(express.static(__dirname + '/' + sitePath));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.get('/words', (req,res)=> {
  Word.find({}).then(function(words) {
    res.render('index', {
      words: words
    });
  })
});

app.post('/', (req,res) => {
  let data = req.body;
  Word.create(data)
});

app.post('/words/:english', (req, res) => {
  Word.findOneAndUpdate({english: req.params.english},req.body, {new: true}).then(() => {
      res.redirect('/words')
  });
});

app.post('/words/:english/delete', (req, res) => {
  Word.findOneAndRemove({english: req.params.english}).then(() => {
    res.redirect('/words');
  });
})

app.listen(port, ()=>{
  console.log(`server running at ${port}`);
});
