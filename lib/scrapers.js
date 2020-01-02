const request = require('superagent');
const { parse } = require('node-html-parser');
const { 
  getCharacterInfo, 
  getMediaInfo, 
  getBookInfo 
} = require('./scrapers');

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
    // create model
    .catch(() => {});
};

const scrapeMovieInfo = async() => {
  const filmNames = ['IT:_Chapter_Two_', 'IT_'];
  return await filmNames.map(name => {
    return request
      .get(`https://stephenking.fandom.com/wiki/${name}(film)`)
      .then(res => res.text)
      .then(parse)
      .then(html => getMediaInfo(html, true))
      // create model
      .then(console.log);
  });
};

const scrapeSeriesInfo = async() => {
  return await request
    .get('https://stephenking.fandom.com/wiki/IT_(1990_miniseries)')
    .then(res => res.text)
    .then(parse)
    .then(html => getMediaInfo(html, false))
    // create model
    .then(console.log);
};

const scrapeAllInfomation = async() => {
  const { information, characterLinks } =  await scrapeBookInfo();
  // await create Book 
  await scrapeCharacterInfo(characterLinks);
  await scrapeMovieInfo();
  await scrapeSeriesInfo();
};

scrapeAllInfomation();
