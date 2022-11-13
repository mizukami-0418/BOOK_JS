'use strict'

const lang = document.querySelector('html').lang;

if(lang === 'ja') {
  document.querySelector('option[value="index.html"]').selected = true;
} else if(lang === 'en') {
  document.querySelector('option[value="index-katakana.html"]').selected = true;
} else if(lang === 'zh') {
  document.querySelector('option[value="index-kanji.html"]').selected = true;
}

document.getElementById('form').select.onchange = function() {
  location.href = document.getElementById('form').select.value;
}