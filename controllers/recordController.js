const pool = require('../config/db');

const getAllRecords = (req,res) =>{
  pool.query('SELECT * FROM evidencijaelektrana ORDER BY id ASC', (error,results)=>{
   if(error){
     throw error
   }
   res.status(200).json(results.rows)
  })
 }
 
 const getRecord = (req,res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM evidencijaelektrana WHERE id=$1',[id],(error,results)=>{
    if (error){
      throw error;
    }
    res.status(200).json(results.rows);
  })
 }

 const addRecord = (req,res) => {
  const {
    nazivelektrane,
    mesto,
    adresa,
    datumpustanjaurad,
    sifravrstepogona
  } = req.body

  pool.query('INSERT INTO evidencijaelektrana (nazivelektrane,mesto,adresa,datumpustanjaurad,sifravrstepogona) VALUES ($1,$2,$3,$4,$5) RETURNING *',[nazivelektrane,mesto,adresa,datumpustanjaurad,sifravrstepogona], (error,results)=>{
    if (error){
      throw error;
    }
    res.status(201).send(`Record added with ID: ${results.rows[0].id}`)
  })
 }

 const deleteRecord = (req,res) =>{
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM evidencijaelektrana WHERE id=$1',[id], (error,results)=>{
    if(error){
      throw error;
    }
    res.status(200).send(`Sucssesfully deleted record with ID:${id}`)
  })
 }

 const updateRecord = (req, res) => {
  const id = parseInt(req.params.id)
  const {
    nazivelektrane,
    mesto,
    adresa,
    datumpustanjaurad,
    sifravrstepogona
  } = req.body

  pool.query('UPDATE evidencijaelektrana Set nazivelektrane = $1, mesto = $2, adresa = $3, datumpustanjaurad = $4, sifravrstepogona = $5 WHERE id = $6',[nazivelektrane,mesto,adresa,datumpustanjaurad,sifravrstepogona,id], (error,results)=>{
    if (error){
      throw error;
    }
    res.status(200).send(`Record updated with ID: ${id}`)
  })
}

 module.exports = {
  getAllRecords,
  getRecord,
  addRecord,
  deleteRecord,
  updateRecord
 };