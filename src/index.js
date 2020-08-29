const express = require('express');
const meanings = require('./meanings');
const synonyms = require('./synonyms');

const app = express();

app.get('/:word', meanings);

app.get('/meanings/:word', meanings);
app.get('/synonyms/:word', synonyms);


app.listen(process.env.PORT || 3333);
