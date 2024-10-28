const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const db = require('./controllers/queries.js')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req,res) =>{
  res.json({info: 'NEP API'})
});

app.get('/records',db.getAllRecords);
app.get('/records/:id',db.getRecord);
app.post('/records',db.addRecord);
app.delete('/records/:id',db.deleteRecord);
app.put('/records/:id',db.updateRecord);

module.exports = app;