const pool = require("../config/db");

function incrementRecord(sifravrstepogona,res) {
  const sifra = sifravrstepogona;
  pool.query(
    "UPDATE vrstapogona SET ukupanbrojelektrana = ukupanbrojelektrana + 1 WHERE sifra = $1 RETURNING *",
    [sifra],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({
        message: `Incremented ukupanbrojelektrana for sifra ${sifra}`,
        updatedRecord: results.rows[0],
      });
    }
  );
}
function decrementRecord(sifravrstepogona,res) {
  const sifra = sifravrstepogona;
  pool.query(
    "UPDATE vrstapogona SET ukupanbrojelektrana = ukupanbrojelektrana - 1 WHERE sifra = $1 RETURNING *",
    [sifra],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({
        message: `Decremented ukupanbrojelektrana for sifra ${sifra}`,
        updatedRecord: results.rows[0],
      });
    }
  );
}
module.exports = {
  incrementRecord,
  decrementRecord,
};
