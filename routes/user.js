const express = require("express");
const mongoose = require("mongoose");
const userModel = require("../model/users/userModel");
const queue = require("../model/users/queue");
const addTnC = require("../model/admins/addTableNChairs");
const jwt = require('../token/jwt');
const errorHandler = require("../controller/authErrorHandler");

const router = express.Router();

// Create New Account
router.post("/user/create-user", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await userModel.create({ name, email, password });
    const token = jwt.createToken(user._id);
    res.cookie('jwt', token, {httpOnly:true, maxAge: 30 * 24 * 60 * 60 * 1000});
    res.status(200).json({user: user._id});
  } catch (err) {
    const errors = errorHandler(err);
    res.status(404).json({ errors });
  }
});

// Log In User
router.post('/user/user-login', async(req, res)=>{
  const { email, password} = req.body;
  try {
    const user = await userModel.login(email,password)
    res.status(200).json({user: user._id})
  } catch (error) {
    res.status(400).json({})
  }
}) 

//  Get user by Id
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await userModel.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({error})
  }
});

//  Delete user by id
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findOneAndDelete({ _id: id });
  res.status(200).json(user);
});

// Get booked Tables
router.get("/store/booked-tables/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const booked = await addTnC.find({ userId: id });
    res.status(200).json(booked); 
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get queue Number
router.get("/store/waiting-list/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const waitingList = await queue.find({ userId: id });
    res.status(200).json(waitingList); 
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//  Assign Tables with respect to headcount
router.patch("/store/book-table", async (req, res) => {
  let { headCount, id } = req.body;
  let freeTable = await addTnC.findOne({ status: "free" });
  let allFreeTables = await addTnC.find({ status: "free" });
  let chairPerTable;
  
  let finishedOrder = [];
  let booked = [];
  let queueed = [];
  
  const allFreeTablessCount = allFreeTables.length;
  
  { freeTable &&  (chairPerTable = Object.keys(freeTable.chairs).length) }

  if (allFreeTablessCount > 0) {
    for (let i = 1; i <= allFreeTablessCount; i++) {
      try {
        const assign = await addTnC.findOneAndUpdate(
          { status: "free" },
          { $set: { status: "occupied", userId: id } }, 
          { new: true }
        );
        // res.status(200).json(assign);
        booked.push(assign);
        // setTimeout( async() => {
        //   const timeUp = await addTnC.findOneAndUpdate({ userId:id},{$set:{status:'free', userId:null}});
        //   finishedOrder.push(timeUp);
        // }, 40000);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
      headCount -= chairPerTable;
    }

    if (headCount > 0) {
      const getQueue = await queue.find({});
      const queueLength = Object.keys(getQueue).length;

      // const arr = Array.from(Array(queueLength + 1).keys());
      // arr.shift(0);
      // let queueNumber = Object.assign({}, arr);

      try {
        const addQueue = queue.create({
          queueNumber: queueLength + 1,
          queuePersons: headCount,
          userId:id
        });
        queueed.push({
          queueNumber: queueLength + 1,
          queuePersons: headCount,
        });
        // setTimeout( () => {
        //   const timeUp = queue.findOneAndDelete({userId:id})
        //   finishedOrder.push(timeUp);
        // }, 40000 )
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    }
    //   for (let i = 1; i <= headCount; i++) {
    //     queueTest.push({ queueNum: i })

    // }
  }

  res.json({ booked, queueed });
});

// End Order
router.patch("/:userId/queue", async (req, res) => {
  const { id } = req.params;

  const queueNumber = await queue.find({ userId: id});
  const orderedTable = addTnC.find({ userId:id })

  res.json({queueNumber:queueNumber})

});

module.exports = router;
