const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const { Activities, Country } = require("../db");
const { Sequelize, UUID, where } = require("sequelize");
//const Activities = require("../models/Activities");
const router = Router();

router.post("/", async (req, res, next) => {
  const { name, difficulty, duration, season, countries } = req.body;
  //console.log(name, difficulty, duration, season, countries);

  if (!name || !difficulty || !duration || !season || countries.length === 0) {
    res.status(400).send("hay campos vacios");
    console.log("hay campos vacios");
    return;
  }

  try {
    let activityExistent = await Activities.findOne({
      where: {
        name: name,
      },
    });
    if (activityExistent) {
      res.send({ msg: "Activity already exists, could not be created" });
    } else {
      let newActivity = await Activities.create({
        id: uuidv4(),
        name,
        difficulty,
        duration,
        season,
      });

      const promises = countries?.map((c) => {
        return new Promise(async (resolve, reject) => {
          let findCountry = await Country.findOne({
            where: {
              name: c,
            },
          });
          resolve(newActivity.addCountry(findCountry));
          reject((err) => next(err));
        });
      });
      await Promise.all(promises);
      let response = await Activity.findOne({
        where: {
          id: newActivity.id,
        },
        include: [
          {
            model: Country,
          },
        ],
      });

      res.send(response);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let activity = await Activity.findAll({
      include: [
        {
          model: Country,
        },
      ],
    });

    res.send(activity);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
