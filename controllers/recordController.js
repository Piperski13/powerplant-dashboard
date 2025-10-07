const Record = require("../model/recordsModel.js");
const path = require("path");

// CRUD HANDLERS START

const getRecord = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const record = await Record.getById(id);
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

const deleteRecord = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const results = await Record.deleteById(id);

    if (results.rowCount === 0) {
      res.status(404).json({ message: `Record with ${id} was not found ` });
    }
    const deletedRecord = results[0];
    res.status(200).json({
      message: `Deleted Record with ID ${id}`,
      sifravrstepogona: deletedRecord.sifravrstepogona,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      nazivelektrane,
      mesto,
      adresa,
      datumpustanjaurad,
      sifravrstepogona,
    } = req.body;

    await Record.updateById({
      id,
      nazivelektrane,
      mesto,
      adresa,
      datumpustanjaurad,
      sifravrstepogona,
    });

    res.status(200).json({
      message: `Record with ID: ${id} updated sucessfully`,
      sifravrstepogona: sifravrstepogona,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// CRUD HANDLERS END

module.exports = {
  getRecord,
  addRecord,
  deleteRecord,
  updateRecord,
};
