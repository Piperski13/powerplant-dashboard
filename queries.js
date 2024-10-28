require('dotenv').config('./env');

const Pool = require('pg').Pool
const pool = new Pool ({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getAllRecords = (req,res) =>{
  pool.query('SELECT * FROM evidencijaelektrana ORDER BY id ASC', (error,results)=>{
   if(error){
     throw error
   }
   res.status(200).json(results.rows)
  })
 }
 module.exports = getAllRecords;
