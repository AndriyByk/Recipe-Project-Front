const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/recipe-project-front'));

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname + '/dist/recipe-project-front/index.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/dist/recipe-project-front/favicon.ico'));
});

app.listen(process.env.PORT || 8080);
