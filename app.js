const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const recordRouter = require('./routes/recordRoutes.js')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req,res) =>{
  res.json({info: 'NEP API'})
});

app.use('/records',recordRouter);

module.exports = app;