const axios = require('axios');
const cheerio = require('cheerio');

const config = {
  headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.77 Mobile Safari/537.36' }
};

const scrapeNovelKeys = async () => {
  const url = `https://novelkeys.com/collections/keyboards`;

  return await axios.get(url, config);
};

const getKeyboardData = async () => {
  const { data } = await scrapeNovelKeys();
  const $ = cheerio.load(data);

  const keyboards = [];

  $("div.product-card")
    .map((i, product) => {
      keyboards.push({
        name: $(product).find("div.product-card__title").text().trim(),
        stock: $(product).find("div.product-tag").text().trim(),
        productLink: `https://novelkeys.com${$(product).find("a.full-width-link").attr('href')}`,
        imageLink: $(product).find("img.grid-view-item__image").attr('src'),
        originalPrice: $(product).find("div.price-item--regular > strike").text().trim() || $(product).find("div.price-item--regular").text().trim(),
        discountPrice: $(product).find("div.price-item--regular > span").text().trim(),
        site: 'novelkeys',
        dateNow: Date.now(),
      });
    });

  return keyboards;
}  

getKeyboardData();
