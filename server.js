const app = require('./app.js')
require('dotenv').config('./env');

const port = process.env.PORT;

app.listen(port,()=>{
  console.log(`App running on port ${port}`);
});