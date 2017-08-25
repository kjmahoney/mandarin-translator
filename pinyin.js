var pinyin = require("pinyin");
console.log(pinyin('中心'));

characterToPinyin = (word) => {
  return pinyin(word);
}

let balls = characterToPinyin('美国');

console.log(balls);
