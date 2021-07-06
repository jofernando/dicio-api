const express = require('express');
const meanings = require('./meanings');
const synonyms = require('./synonyms');
const syllables = require('./syllables');
const sentence = require('./sentences');

const app = express();
app.disable('x-powered-by');

app.get('/:word', meanings);

app.get('/meanings/:word', meanings);
app.get('/synonyms/:word', synonyms);
app.get('/syllables/:word', syllables);
app.get('/sentences/:word', sentence);


app.listen(process.env.PORT || 3333);
