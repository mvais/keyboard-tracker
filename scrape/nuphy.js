const axios = require('axios');
const cheerio = require('cheerio');

const config = {
  headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.77 Mobile Safari/537.36' }
};

const scrapeNuphy = async () => {
  const url = `https://nuphy.com//collections/keyboards`;

  return await axios.get(url, config);
};

const getKeyboardData = async () => {
  const { data } = await scrapeNuphy();
  const $ = cheerio.load(data);

  const keyboards = [];
  const domain    = "https://nuphy.com"

  $("div.grid-item__content")
    .map((i, product) => {
      keyboards.push({
        name: $(product).find("div.grid-product__title").text().trim(),
        stock: $(product).find("div.grid-product__tags").text().trim() !== 'sold out',
        productLink: `${domain}${$(product).find("a.grid-item__link").attr('href')}`,
        imageLink: `https:${cheerio.load($(product).find(".grid-product__image-wrap noscript").first().text().trim())('img').attr('src')}`,
        originalPrice: $(product).find("span.grid-product__price--current .money").first().text().trim(),
        discountPrice: $(product).find("span.grid-product__price--current .money").first().text().trim(),
        site: 'nuphy',
        dateNow: Date.now(),
      })
    });

  console.log(keyboards);

  return keyboards;
}

getKeyboardData();
