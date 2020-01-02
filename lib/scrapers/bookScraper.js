const request = require('superagent');
const { parse } = require('node-html-parser');
const { getBookInfo, getCharacterInfo } = require('../utils/scraperHelpers');

const scrapeCharacterInfo = async(characterLinks) => {
  return await characterLinks.map(async(link) => {
    return await request
      .get(`https://stephenking.fandom.com${link}`)
      .then(res => res.text)
      .then(parse)
      .then(getCharacterInfo)
      .then(console.log)
      .catch(() => {});
  });
};

const scrapeBookInfo = async() => {
  const { information, characterLinks } =  await request
    .get('https://stephenking.fandom.com/wiki/IT_(book)#')
    .then(res => res.text)
    .then(parse)
    .then(getBookInfo)
    .catch(() => {});
  
  await scrapeCharacterInfo(characterLinks);
};

scrapeBookInfo();
