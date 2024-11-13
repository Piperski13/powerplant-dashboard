const getTotalRecordsOfPowerPlants = require('../../../helpers/powerPlantHelpers.js');

async function businessRuleMiddleware(req, res, next) {
  const sifra = req.body.sifravrstepogona
  
  try {
    const records = await getTotalRecordsOfPowerPlants(sifra);
    const total = records.length > 0 ? records[0].ukupanbrojelektrana : 0;

    if (total < 9) {
      return next();
    } else {
      return res.status(400).json({ message: "Limit for vrstapogona reached" });
    }
  } catch (error) {
    console.error("Unexpected error in businessRuleMiddleware:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = businessRuleMiddleware;