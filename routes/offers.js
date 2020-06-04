const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/graduates/:id/offers", async (req, res, next) => {
  try {
    //We can use the following command asw weel
    /*
   SELECT
    graduates.id,
	name,
    ARRAY_AGG (title) offers
FROM
    graduates
INNER JOIN offers ON offers.graduate_id = graduates.id
GROUP BY
     graduates.id
ORDER BY
     graduates.id
	 ;*/
    const graduate = await db.query(
      `SELECT
        graduates.id,
        graduates.name,
        offers.title
      FROM
      graduates
        INNER JOIN offers ON offers.graduate_id = graduates.id
       WHERE graduates.id = $1
       ORDER BY
       graduates.name
    `,
      [req.params.id]
    );

    var graduatesMap = {};
    var graduates = [];

    graduate.rows.forEach((row) => {
      var graduate = graduatesMap[row.name];
      if (!graduate) {
        graduate = {
          id: row.id,
          name: row.name,
          offers: [],
        };

        graduatesMap[row.name] = category;
        graduates.push(category);
      }

      graduate.offers.push({
        name: row.title,
      });
    });

    return res.json(graduates);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
