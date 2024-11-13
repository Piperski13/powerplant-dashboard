const pool = require('../config/db');

// Helper function to get total records of power plants for a specific 'sifra'
async function getTotalRecordsOfPowerPlants(sifra) {
  try {
    const result = await pool.query(
      "SELECT ukupanbrojelektrana FROM vrstapogona WHERE sifra = $1;",
      [sifra]
    );
    console.log(result);
    return result.rows; 
  } catch (error) {
    console.error("Error in getTotalRecordsOfPowerPlants query:", error);
    throw new Error("Failed to get total records of power plants");
  }
}
module.exports = getTotalRecordsOfPowerPlants;