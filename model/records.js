const pool = require("../config/db");

class Record{
  static async add({nazivelektrane, mesto, adresa, datumpustanjaurad, sifravrstepogona}){

    const query = `INSERT INTO evidencijaelektrana (nazivelektrane,mesto,adresa,datumpustanjaurad,sifravrstepogona) VALUES ($1,$2,$3,$4,$5) RETURNING *`;

    const value = [nazivelektrane, mesto, adresa, datumpustanjaurad, sifravrstepogona];

    const {rows} = await pool.query(query,value)

    return rows[0] // return new record
  }
  static async getAll(){
    const query = `SELECT * FROM evidencijaelektrana ORDER BY id ASC`;

    const {rows} = await pool.query(query);
    return rows;
  }
}


module.exports = Record;
