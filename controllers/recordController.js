const pool = require("../config/db");

const getAllRecords = (req, res) => {
  pool.query(
    "SELECT * FROM evidencijaelektrana ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};
const getTotalRecords = (req, res) => {
  pool.query("SELECT * FROM vrstapogona", (error, results) => {
    if (error) {
      console.error("Error in test query:", error);
      return res.status(500).json({ error: "Test query failed" });
    }
    res.status(200).json(results.rows);
  });
};

const getRecord = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM evidencijaelektrana WHERE id=$1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const addRecord = (req, res) => {
  const { nazivelektrane, mesto, adresa, datumpustanjaurad, sifravrstepogona } =
    req.body;

  pool.query(
    "INSERT INTO evidencijaelektrana (nazivelektrane,mesto,adresa,datumpustanjaurad,sifravrstepogona) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [nazivelektrane, mesto, adresa, datumpustanjaurad, sifravrstepogona],
    (error, results) => {
      if (error) {
        throw error;
      }
      const addedRecord = results.rows[0];
      res.status(201).json({
        message: `Record added with ID: ${addedRecord.id}`,
        sifravrstepogona: addedRecord.sifravrstepogona,
      });
    }
  );
};

const deleteRecord = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "DELETE FROM evidencijaelektrana WHERE id=$1 RETURNING *",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rowCount === 0) {
        res.status(404).json({ message: `Record with ${id} was not found ` });
      }

      const deletedRecord = results.rows[0];

      res.status(200).json({
        message: `Deleted Record with ID ${id}`,
        sifravrstepogona: deletedRecord.sifravrstepogona,
      });
    }
  );
};

const updateRecord = (req, res) => {
  const id = parseInt(req.params.id);
  const { nazivelektrane, mesto, adresa, datumpustanjaurad, sifravrstepogona } =
    req.body;

  pool.query(
    "UPDATE evidencijaelektrana Set nazivelektrane = $1, mesto = $2, adresa = $3, datumpustanjaurad = $4, sifravrstepogona = $5 WHERE id = $6",
    [nazivelektrane, mesto, adresa, datumpustanjaurad, sifravrstepogona, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Record updated with ID: ${id}`);
    }
  );
};

module.exports = {
  getAllRecords,
  getRecord,
  addRecord,
  deleteRecord,
  updateRecord,
  getTotalRecords,
};
