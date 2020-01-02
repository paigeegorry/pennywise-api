const lodash = require('lodash');

const getInformation = (html) => {
  const name = html.querySelectorAll('.pi-title').map(node => node.rawText)[0];
  const labels = html.querySelectorAll('.pi-data-label').map(node => node.rawText);
  
  const values = html.querySelectorAll('.pi-data-value')
    .map(node => node.structuredText)
    .filter(str => str !== name || !str.includes(name));
  
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
    else if(value.includes('\n')) {
      value = values[idx].split('\n');
    }
    else if(value.includes(', ') && key !== 'releaseDates') {
      value = values[idx].split(', ');
    }
    acc[key] = value;
    return acc;
  }, information);
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
    otherPhotos.length && otherPhotos
      .map(node => node.attributes)
      .map(attr => photos.push(attr['data-src']));
    return photos;
  }
  return undefined;
};

const getMediaInfo = (html, isFilm) => {
  const title = html.querySelectorAll('.pi-title').map(node => node.rawText)[0];
  const cast = html.querySelectorAll('li').map(node => (node.rawText).trim()).slice(16, 43);

  const realCast = cast.reduce((acc, ele) => {
    let value = ele.split(' as ');
    if(ele.includes('Pennywise') || ele.includes('\n')) {
      ele.split('\n')
        .map(str => str.split(' as '))
        .map(str => {
          str[1] ? acc[str[1].trim()] = str[0] : undefined;
        });
    }
    else {
      value[1] ? acc[value[1].trim()] = value[0].trim() : undefined;
    }
    return acc;
  }, {});

  let information = getInformation(html);
  information.title = title.split('(')[0].trim();
  information.medium = isFilm ? 'film' : 'series';
  information.cast = realCast;
  information.photos = getPhotoInfo(html);
  
  return information;
};

const getBookInfo = html => {
  const title = html.querySelectorAll('.pi-title').map(node => node.rawText)[0];
  const type = title.split('(').map(str => str.replace(')', ''))[1];
  const characterInfo = html.querySelectorAll('p b a').map(node => node.attributes);
  const characters = characterInfo.map(obj => obj.title);
  let characterLinks = characterInfo.map(obj => obj.href);
  characterLinks.push('/wiki/It_(Creature)');
  
  let information = getInformation(html);
  information.title = title.split('(')[0].trim();
  information.medium = type;
  information.characters = characters;
  information.photos = getPhotoInfo(html);
  
  return { information, characterLinks };
};

module.exports = { 
  getInformation, 
  getPhotoInfo, 
  getCharacterInfo,
  getMediaInfo,
  getBookInfo
};
