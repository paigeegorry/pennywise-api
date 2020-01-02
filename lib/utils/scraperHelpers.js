const lodash = require('lodash');

const getInformation = (html) => {
  const labels = html.querySelectorAll('.pi-data-label').map(node => node.rawText);
  const name = html.querySelectorAll('.pi-title').map(node => node.rawText)[0];
  const values = html.querySelectorAll('.pi-data-value').map(node => node.rawText).filter(str => str !== name);
  
  let information = {};
  return labels.reduce((acc, ele, idx) => {
    let key = lodash.camelCase(ele);
    let value = values[idx];
    if(value.includes('(')) {
      value = values[idx]
        .split(')')
        .map(str => (str + ')').trim())
        .filter(str => str !== ')');
    }
    acc[key] = value;
    return acc;
  }, information);
};

const getBookInfo = html => {
  const bookTitle = html.querySelectorAll('.pi-title').map(node => node.rawText)[0];
  const type = bookTitle.split('(').map(str => str.replace(')', ''))[1];
  const characterInfo = html.querySelectorAll('p b a').map(node => node.attributes);
  const characters = characterInfo.map(obj => obj.title);
  let characterLinks = characterInfo.map(obj => obj.href);
  characterLinks.push('/wiki/It_(Creature)');
  
  let information = getInformation(html);
  information.title = bookTitle.split('(')[0].trim();
  information.medium = type;
  information.characters = characters;
  
  return { information, characterLinks };
};

const getCharacterInfo = html => {
  const name = html.querySelectorAll('.pi-title').map(node => node.rawText)[0];
  const characterInfo = getInformation(html);
  const thumbnail = getPhotoInfo(html);
  characterInfo.name = name;
  characterInfo.photos = thumbnail;
  return characterInfo;
};

const getPhotoInfo = html => {
  const mainPhoto = html.querySelectorAll('.pi-image-thumbnail');
  const otherPhotos = html.querySelectorAll('.thumbimage');
  let photos = [];
  if(mainPhoto.length) {
    photos.push(mainPhoto[0]
      .rawAttrs.split('"')[1]);
    otherPhotos
      .map(node => node.attributes)
      .map(attr => photos.push(attr['data-src']));
    return photos;
  }
  return undefined;
};

module.exports = { getInformation, getBookInfo, getCharacterInfo };
