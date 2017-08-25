const translate = function(e) {
  e.preventDefault();

  let word = document.getElementById('translate-input').value;

  let APIUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trns"+
  "l.1.1.20161224T005353Z.9e104eecc7c8560f.938a2af78ac0f6868c443d729e48ee590e87d897&text="
  +word
  +"&lang="
  +'en'
  +"-"
  +'zh'

  let request = new Request(APIUrl);

  fetch(request).then((response) => {
    return response.json().then(function(json){
      document.getElementById('translate-output').innerHTML = json.text[0];
    })
  })
}

document.getElementById('translate-input-form').addEventListener('submit', translate);
