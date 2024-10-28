const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const db = require('./queries.js')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req,res) =>{
  res.json({info: 'NEP API'})
});

app.get('/records',db);

module.exports = app;