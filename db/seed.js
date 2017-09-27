const mongoose = require('./connection');
const seedData = require('./seeds');
const models = require('./models');

const Word = mongoose.model('Word');

Word.remove({}).then(_ =>{
  Word.collection.insert(seedData)
  .then(_ => process.exit())
}).catch(err => console.log(err));
