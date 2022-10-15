const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Op } = require("sequelize");
const { Country, Activities } = require("../db.js");
const { getAllCountries } = require("../controllers/countryController.js");

router.get("/", getAllCountries);

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  let country;
  try {
    country = await Country.findOne({
      where: {
        id: id.toUpperCase(),
      },
      include: [
        {
          model: Activities,
          attributes: ["name", "difficulty", "duration", "season"],
        },
      ],
    });
    // console.log(country.id);
    //console.log(id);
    if (country) {
      res.send(country);
    } else {
      res.send({ msg: "The country searched by ID was not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
