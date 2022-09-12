const axios = require('axios');
const cheerio = require('cheerio');

const config = {
  headers: {'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.77 Mobile Safari/537.36'}
};

var scrapeNovelKeys = async function() {
    const url = `https://novelkeys.com/collections/keyboards`;
    await axios.get(url, config)
        .then((html) => {
        console.log(html);
    });
};

scrapeNovelKeys();