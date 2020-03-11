var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Arctouch Challenge!');
});

app.listen(3000, function () {
  console.log('Arctouch App listening on port 3000!');
});