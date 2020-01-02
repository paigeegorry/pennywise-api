const request = require('superagent');
const { parse } = require('node-html-parser');
const { getBookInfo, getFilmInfo, getCharacterInfo } = require('../utils/scraperHelpers');

const scrapeCharacterInfo = async(characterLinks) => {
  return await characterLinks.map(async(link) => {
    return await request
      .get(`https://stephenking.fandom.com${link}`)
      .then(res => res.text)
      .then(parse)
      .then(getCharacterInfo)
      .catch(() => {});
  });
};

const scrapeBookInfo = async() => {
  return await request
    .get('https://stephenking.fandom.com/wiki/IT_(book)#')
    .then(res => res.text)
    .then(parse)
    .then(getBookInfo)
    .catch(() => {});
};

const scrapeAllInfomation = async() => {
  // const { information, characterLinks } =  await scrapeBookInfo();
  // await scrapeCharacterInfo(characterLinks);

  const filmNames = ['IT:_Chapter_Two_', 'IT_'];

  return await filmNames.map(name => {
    return request
      .get(`https://stephenking.fandom.com/wiki/${name}(film)`)
      .then(res => res.text)
      .then(parse)
      .then(getFilmInfo)
      .then(console.log);
  });

};

scrapeAllInfomation();
