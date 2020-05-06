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
            meanings.push(text);
        });

        res.json([...meanings]);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

});

app.listen(3333 || process.env.PORT);