const axios = require('axios');
const cheerio = require('cheerio');
const extensoWord = require('./utils/extenso');

module.exports = async (req, res) => {

  const { size } = req.params;
  const palavraExtenso = extensoWord(size);

  try {

    const { data: dicioHTML } = await axios.get(`https://www.dicio.com.br/palavras-com-${palavraExtenso}-letras/`);

    const $ = cheerio.load(dicioHTML);

    const palavras = [];

    $('.list-title').next().next()[0].children.forEach((palavra) => {
      if ($(palavra)[0].data != undefined && $(palavra)[0].data.trim().length > 0) {
        palavras.push($(palavra)[0].data);
      }
    });
    res.json(palavras);

  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message })
  }
}
