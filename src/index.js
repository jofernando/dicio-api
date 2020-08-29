const express = require('express');
const meanings = require('./meanings');

const app = express();

app.get('/:word', meanings);


app.listen(process.env.PORT || 3333);
