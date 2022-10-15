const axios = require("axios");
const { Country } = require("../db.js");
const { Op } = require("sequelize");
// Controller functions:

async function getAllCountries(req, res, next) {
  const { name } = req.query;

  if (!name) {
    const allCountries = await Country.findAll();
    res.json(allCountries);
  } else {
    try {
      const findCountry = await Country.findAll({
        where: {
          name: { [Op.iLike]: `% ${name}%` },
        },
      });

      if (findCountry.length === 0) {
        res.send("Country not found");
      } else {
        res.send(findCountry);
      }
    } catch (error) {
      next(error);
    }
  }
}

async function loadDataBase() {
  const allInfoCountry = await axios.get(`https://restcountries.com/v3/all`);
  const promises = allInfoCountry.data?.map((c) => {
    new Promise(async (resolve, reject) => {
      resolve(
        await Country.findOrCreate({
          where: {
            id: c.cca3,
            name: c.name.official,
            flags: c.flags[0],
            continents: c.continents[0],
            capital: c.capital ? c.capital[0] : "",
            subregion: c.subregion || "",
            area: c.area,
            population: c.population,
          },
        })
      );
      reject((err) => {
        next(err);
      });
    });
  });
  await Promise.all(promises);
}

module.exports = { getAllCountries, loadDataBase };
