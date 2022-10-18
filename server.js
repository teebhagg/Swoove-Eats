//  Pacake Imports
const express = require("express");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const TnCRoutes = require('./routes/addTableNChairs');
const adminModel = require("./model/admins/adminModel");

DB_URL =
  "mongodb+srv://tee_bhagg:test1234@swoovetest.nkqvjby.mongodb.net/?retryWrites=true&w=majority";
const app = express();
app.use(express.json());

mongoose.connect(DB_URL).then(()=>{
  console.log("database connected");
  app.listen(4000, () => {
    console.log("server running");
    // Endpoints for shop owners
    app.use(adminRoutes);
    // Endpoints for customers
    app.use(userRoutes);
    // app.use(TnCRoutes); 
  });

}).catch(err=> console.log(err));
