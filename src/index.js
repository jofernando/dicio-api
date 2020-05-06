const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/:word', async (req, res) => {

  const { word } = req.params;

  try {

    const { data: dicioHTML } = await axios.get(`https://dicio.com.br/${word}`);

    const $ = cheerio.load(dicioHTML);

    const meanings = [];

    $('.significado span').each((_, element) => {

      const text = $(element).text();
      const cheerioElement = $(element);

      if (cheerioElement.hasClass('cl'))
        meanings.push({ class: text, meanings: [], etymology: '' });

      else if (cheerioElement.hasClass('etim'))
        meanings[meanings.length - 1].etymology = text;

      else if (!cheerioElement.hasClass('tag'))
        meanings[meanings.length - 1].meanings.push(text);

    });

    res.json(meanings);

  } catch (err) {
    res.status(400).json({ error: err.message })
  }

});


app.listen(process.env.PORT || 3333);
