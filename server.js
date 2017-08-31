const sitePath = process.argv[2] || '.';
const express = require('express');
const app = express();
const port = 4000;

let testJson = {
  name: "kevin"
}

app.use((req, res, next) => {
  console.log(req.url);
  // next() with no arguments allows to pretend you didn't handle the route so that something else can pick it up instead.
  next();
});

app.get('/data', (req,res)=> {
  res.json(json);
})

app.use(express.static(__dirname + '/' + sitePath));

app.listen(port, ()=>{
  console.log(`server running at ${port}`);
});
