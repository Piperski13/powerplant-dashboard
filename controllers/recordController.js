const pool = require("../config/db");
const Record = require("../model/records.js");

const getAllRecords = async (req, res) => {
  try {
    const allRecords = await Record.getAll();
    res.status(200).json(allRecords);

    if (!allRecords || allRecords.length === 0) {
      return res.status(404).json({ message: "No records found." });
    }
  } catch (error) {
    console.error("Error fetching records:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching records.",
      details: error.message,
    });
  }
};

const getRecord = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM evidencijaelektrana WHERE id=$1;",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const addRecord = async (req, res) => {
  try {
    const {
      nazivelektrane,
      mesto,
      adresa,
      datumpustanjaurad,
      sifravrstepogona,
    } = req.body;

    const newRecord = await Record.add({
      nazivelektrane,
      mesto,
      adresa,
      datumpustanjaurad,
      sifravrstepogona,
    });
    res.status(201).json({
      message: `Record added with ID: ${newRecord.id}`,
      sifravrstepogona: newRecord.sifravrstepogona,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
      res.status(200).json({
        message: `Record with ID: ${id} updated sucessfully`,
        sifravrstepogona: sifravrstepogona,
      });
    }
  );
};

// small table (vrstapogona) START
const getPowerPlants = (req, res) => {
  pool.query(
    "SELECT * FROM vrstapogona ORDER BY sifra ASC;",
    (error, results) => {
      if (error) {
        console.error("Error in test query:", error);
        return res.status(500).json({ error: "Get Power Plants query failed" });
      }
      res.status(200).json(results.rows);
    }
  );
};
// small table (vrstapogona) END

module.exports = {
  getAllRecords,
  getRecord,
  addRecord,
  deleteRecord,
  updateRecord,
  getPowerPlants,
};
