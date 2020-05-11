const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/:word', async (req, res) => {

  const { word } = req.params;
  const sanitizedWord = sanitizeWord(word)

  try {

    const { data: dicioHTML } = await axios.get(`https://dicio.com.br/${sanitizedWord}`);

    const $ = cheerio.load(dicioHTML);

    const meanings = [];
    const structure = {
      class: '',
      meanings: [],
      etymology: ''
    }
    meanings.push(structure);

    $('.significado span').each((_, element) => {

      const text = $(element).text();
      const cheerioElement = $(element);

      if (cheerioElement.hasClass('cl')) {
        if (meanings.length === 1 && meanings[0].class === '' && meanings[0].meanings.length === 0)
          meanings[0].class = text;
        else
          meanings.push({ class: text, meanings: [], etymology: '' });
      }

      else if (cheerioElement.hasClass('etim'))
        meanings[meanings.length - 1].etymology = text;

      else if (!cheerioElement.hasClass('tag'))
        meanings[meanings.length - 1].meanings.push(text);

    });

    if ($('.conjugacao').html()) meanings.push({ ...structure, meanings: [] });

    $('.conjugacao span').each((_, element) => {

      const text = $(element).text();
      const cheerioElement = $(element);

      if (cheerioElement.hasClass('etim'))
        meanings[meanings.length - 1].etymology = text;

      else if (!cheerioElement.hasClass('tag'))
        meanings[meanings.length - 1].meanings.push(text);

    });

    res.json(meanings);

  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message })
  }

});

function sanitizeWord(word) {
  const wordLowerCased = word.toLowerCase()
  const wordWithoutSpaces = wordLowerCased.trim();
  const wordWithoutEspecialCharacters = wordWithoutSpaces.replace('ç', 'c')
    .replace('á', 'a')
    .replace('é', 'e')
    .replace('í', 'i')
    .replace('ó', 'o')
    .replace('ú', 'u')
    .replace('ã', 'a')
    .replace('õ', 'o')
    .replace('â', 'a')
    .replace('ê', 'e')
    .replace('ô', 'o')

  return wordWithoutEspecialCharacters;
}


app.listen(process.env.PORT || 3333);
