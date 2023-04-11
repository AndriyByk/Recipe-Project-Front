const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/<name-of-app>'));

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname + '/dist/<name-of-app>/index.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/dist/<name-of-app>/favicon.ico'));
});

app.listen(process.env.PORT || 8080);
