const express = require("express");
const mongoose = require("mongoose");
const adminModel = require("../model/admins/adminModel");
const userModel = require('../model/users/userModel')
const addTnC = require("../model/admins/addTableNChairs");
const queue = require("../model/users/queue");
const jwt = require('../token/jwt');
const cookie = require('cookie');
const errorHandler = require("../controller/authErrorHandler");

const router = express.Router();

// Create New Account
router.post("/admin/create-admin", async (req, res) => {
  const { name, email, password} = req.body;
  try {
    const admin = await adminModel.create({ name, email, password });
    const token = jwt.createToken(admin._id);
    res.cookie('jwt', token, {httpOnly:true, maxAge: 30 * 24 * 60 * 60 * 1000});
    res.status(200).json({admin: admin._id});
  } catch (err) {
    const errors = errorHandler(err);
    res.status(404).json({ errors });
  }
}); 

// Login Admin
router.post('/admin/admin-login', async(req, res)=>{
  const { email, password} = req.body;
  try {
    const admin = await adminModel.login(email,password)
    res.status(200).json({admin: admin._id})
  } catch (error) {
    const errors = errorHandler(error);
    res.status(400).json({errors})
  }
})

//  Get all admins
router.get("/admins", async (req, res) => {
  const admin = await adminModel.find({}).sort({ createdAt: -1 });
  console.log('All admis aquired')
  res.status(200).json(admin);
});


//  Get admin by Id
router.get("/admins/:id", async (req, res) => {
  const { id } = req.params;
  const admin = await adminModel.findOne({ _id: id });
  res.status(200).json(admin);
});

//  Delete admin by id
router.delete("/admins/:id", async (req, res) => {
  const { id } = req.params;
  const admin = await adminModel.findOneAndDelete({ _id: id });
  res.status(200).json(admin);
});

//  Get all users
router.get("/users", async (req, res) => {
  const user = await userModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(user);
});

//  Not first Time Post
router.post("/admin/add-table-and-chair", async (req, res) => {
  var { chairs } = req.body;
  const arr = Array.from(Array(chairs + 1).keys());
  arr.shift(0);
  let chair_count = Object.assign({}, arr);

  // Gets Number of Tables
  const lastTableNumber = await addTnC.find({});

  try {
    const TnC = await addTnC.create({
      title: "T",
      label: lastTableNumber.length + 1,
      chairs: chair_count,
      status:'free',
      userId: null

    });
    res.status(200).json(TnC);
  } catch (error) {
    res.status(404).json({ error: error.message });
    console.log(error);
  }
});

// Get Total Tables and Chairs
router.get("/store/all-tables", async (req, res) => {
  try {
    const TablesNChairs = await addTnC.find({});
    res.status(200).json(TablesNChairs);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//Get available Tables
router.get("/store/available-tables", async (req, res) => {
  try {
    const free = await addTnC.find({ status: "free" });
    res.status(200).json(free);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//Get occupied Tables
router.get("/admin/store/occupied-tables", async (req, res) => {
  try {
    const free = await addTnC.find({ status: "occupied" });
    res.status(200).json(free);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//  Get queue
router.get('/users/queue', async(req, res) => {
  try {
    const allQueues = await queue.find({})
    
    if (allQueues.length > 0) {
      res.status(200).json(allQueues)
    } else {
      res.status(200).json({count:0})
    }
  } catch (error) {
    res.status(404).json({error: error.message})
  }
})

module.exports = router;
