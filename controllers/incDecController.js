const IncDec = require("../model/incDecModel.js");

const incrementRecord = async (req, res) => {
  const { sifravrstepogona } = req.body;
  const sifra = sifravrstepogona;
  try {
    const data = await IncDec.increment(sifra);
    res.status(200).json({
      message: `Incremented ukupanbrojelektrana for sifra ${sifra}`,
      updatedRecord: data,
    });
  } catch (error) {
    console.error("Error handler IncDec (inc): ", error.message);
  }
};

const decrementRecord = async (req, res) => {
  const { sifravrstepogona } = req.body;
  const sifra = sifravrstepogona;
  try {
    const data = await IncDec.decrement(sifra);
    res.status(200).json({
      message: `Decremented ukupanbrojelektrana for sifra ${sifra}`,
      updatedRecord: data,
    });
  } catch (error) {
    console.error("Error handler IncDec (dec): ", error.message);
  }
};

module.exports = {
  incrementRecord,
  decrementRecord,
};
