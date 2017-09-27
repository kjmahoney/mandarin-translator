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

const wordsArray = [
  {id: '0',
   chinese: '帅',
   english: 'handsome',
   pinyin: 'shuai4'
 },
  {id: '1',
  chinese: '难看',
  english: 'ugly',
  pinyin: 'nan2kan4',
  }
];
let id = 2;

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
    console.log(words);
    res.render('index', {
      words: words
    });
  })
});

app.post('/', (req,res) => {
  let data = req.body;

  wordsArray.push({
    id: String(id),
    chinese: data.output,
    english: data.input,
    pinyin: data.pinyin
  });
  id +=1;
})

app.put('/words/::id', (req, res)=> {
  let update = req.body;

  let word = _.findIndex(wordsArray, {id: req.params.id})
  if (!words[word]) {
    res.send();
  } else {
    let updatedWord = _.assign(wordsArray[word], update);
    res.json(updatedWord);
  }
})

app.delete('/vocabs/:id', (req, res)=> {
  let word = _.findIndex(words, {id: req.params.id});
  let deletedWord = words[word];
  wordArray.splice(word, 1);
  res.json(deletedWord)
})
//Error handling for every route
app.use((err, req, res, next) =>{
  console.log(err);
})

app.listen(port, ()=>{
  console.log(`server running at ${port}`);
});

module.exports = wordsArray;
