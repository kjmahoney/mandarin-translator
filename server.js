const sitePath = process.argv[2] || '.';
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();
const port = 4000;
const hbs = require('hbs');

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
  // next() with no arguments allows to pretend you didn't handle the route so that something else can pick it up instead.
  next();
});

app.get('/words', (req,res)=> {
  // res.json(wordsArray);
  res.render('index', {wordsArray})
})

app.get('/words/:id', (req, res) => {
  let word = _.find(wordsArray, {id: req.params.id});
  res.render('show', {word})
})

app.post('/', (req,res) => {
  let data = req.body;
  wordsArray.push({id: String(id),
                    chinese: data.output,
                    english: data.input,
                    pinyin: data.pinyin
                  });
  id +=1;
  res.json(data);
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
