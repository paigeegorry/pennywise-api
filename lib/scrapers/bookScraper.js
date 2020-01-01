const request = require('superagent');
const { parse } = require('node-html-parser');
const lodash = require('lodash');

const getBookInfo = html => {
  const bookTitle = html.querySelectorAll('.pi-title').map(node => node.rawText)[0];
  const labels = html.querySelectorAll('.pi-data-label').map(node => node.rawText);
  const values = html.querySelectorAll('.pi-data-value').map(node => node.rawText);
  const characters = html.querySelectorAll('p b a').map(node => node.rawText);
  
  let information = {};
  information.title = bookTitle;
  information = labels.reduce((acc, ele, idx) => {
    let key = lodash.camelCase(ele);
    acc[key] = values[idx];
    return acc;
  }, information);
  information.characters = characters;
  
  return information;
};

const scraper = () => {
  return request
    .get('https://stephenking.fandom.com/wiki/IT_(book)#')
    .then(res => res.text)
    .then(parse)
    .then(getBookInfo)
    .then(console.log);
};

scraper();
