const express = require("express");
const addTnC = require("../model/admins/addTableNChairs");

const router = express.Router();

// First time post
router.post("/admin/add-new-table-and-chair", async (req, res) => {
  var { title, chairs } = req.body;

  const arr = Array.from(Array(chairs + 1).keys());
  arr.shift(0);
  let chair_count = Object.assign({}, arr);
  try {
    const TnC = await addTnC.create({
      title: "T",
      label: 1,
      chairs: chair_count,
    });
    res.status(200).json(TnC);
  } catch (error) {
    res.status(404).json({ error: error.message });
    console.log(error);
  }
});

//  Not first Time Post
router.post("/admin/add-table-and-chair", async (req, res) => {
  var { chairs } = req.body;
  let lastTableNumber;

  const arr = Array.from(Array(chairs + 1).keys());
  arr.shift(0);
  let chair_count = Object.assign({}, arr);

  try {
    const TnC = await addTnC.create({
      title: "T",
      label: lastTableNumber,
      chairs: chair_count,
    });
    res.status(200).json(TnC);
  } catch (error) {
    res.status(404).json({ error: error.message });
    console.log(error);
  }
});

module.exports = router;
