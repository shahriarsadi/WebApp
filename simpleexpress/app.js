
const request = require('request');
const apiKey = '';

const express = require('express');
const bodyParser = require('body-parser');
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.render('index');
})
// this grabs the text that has been inputed for the currencies slot
// app.post('/', function (req, res) {
//   console.log(req.body.currencies);
//   res.render('index');  
// })
app.post('/', function (req, res) {
  let live = req.body.currencies;
  let url = `'http://apilayer.net/api/'=${live}&appid=${apiKey}`
request(url, function (err, response, body) {
    if(err){
      res.render('index', {currencies: null, error: 'Error, please try again'});
    } else {
      let currencies = JSON.parse(body)
      if(currencies.main == undefined){
        res.render('index', {currencies: null, error: 'Error, please try again'});
      } else {
        let liveText = `It's ${live} degrees in ${live}!`;
        res.render('index', {live: liveText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})