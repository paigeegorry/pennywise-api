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

  return await request
    .get('https://stephenking.fandom.com/wiki/IT_(film)')
    .then(res => res.text)
    .then(parse)
    .then(html => html.querySelectorAll('.pi-title').map(node => node.rawText))
    .then(console.log);

};

scrapeAllInfomation();
