const lodash = require('lodash');

const getInformation = (html) => {
  const labels = html.querySelectorAll('.pi-data-label').map(node => node.rawText);
  const values = html.querySelectorAll('.pi-data-value').map(node => node.rawText);
  
  let information = {};
  return labels.reduce((acc, ele, idx) => {
    let key = lodash.camelCase(ele);
    let value = values[idx];
    if(values[idx].includes('(')) {
      value = values[idx].split(')').map(str => str + ')').filter(str => str !== ')');
    }
    acc[key] = value;
    return acc;
  }, information);
};

const getCharacterInfo = html => {
  const name = html.querySelectorAll('.pi-title').map(node => node.rawText)[0];
  const characterInfo = getInformation(html);
  characterInfo.name = name;
  return characterInfo;
};

const getBookInfo = html => {
  const bookTitle = html.querySelectorAll('.pi-title').map(node => node.rawText)[0];
  const type = bookTitle.split('(').map(str => str.replace(')', ''))[1];
  const characterInfo = html.querySelectorAll('p b a').map(node => node.attributes);
  const characters = characterInfo.map(obj => obj.title);
  const characterLinks = characterInfo.map(obj => obj.href);
  
  let information = getInformation(html);
  information.title = bookTitle.split('(')[0].trim();
  information.medium = type;
  information.characters = characters;
  
  return { information, characterLinks };
};

module.exports = { getInformation, getBookInfo, getCharacterInfo };
