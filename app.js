// @TODO
//add on change
//need to add translation loop for pinyin
//es6 interpolation
//if chinese is input then
const pinyin = require("pinyin");

const translate = function(e) {
  e.preventDefault();
  console.log('firing');

  let word = document.getElementById('translate-input').value;
  let fromLanguage = document.getElementById('translate-from-dropdown').value;
  let languageUrl;

  if (fromLanguage === 'en') {
    languageUrl = '&lang=en-zh'
  } else {
    languageUrl = '&lang=zh-en'
  }

  let APIUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trns"+
  "l.1.1.20161224T005353Z.9e104eecc7c8560f.938a2af78ac0f6868c443d729e48ee590e87d897&text="
  +word
  +languageUrl


  let request = new Request(APIUrl);

  fetch(request).then((response) => {
    return response.json().then(function(json){
      //if user inputs chinese word then pinyin the chinese in input field
      let pronounce = pinyin(word);
      //if user inputs english, pinyin the chinese json response
      if (fromLanguage === 'en') {
          pronounce = pinyin(json.text[0]);
      }

      document.getElementById('translate-output').innerHTML = json.text[0];
      document.getElementById('pronounce-output').innerHTML = pronounce[0][0];
    })
  })
}

document.getElementById('translate-input').addEventListener('change', translate);
