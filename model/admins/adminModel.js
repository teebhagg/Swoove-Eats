const mongoose = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
      unique: true,
      lowercase: true,
      validate:[isEmail, 'Please enter a valid email']
    },
    password:{
      type: String,
      required:[true, 'Please enter password'],
      minlength:[6,'Password must be at least 6 characters']
    },
  },
  { timestamps: true }
);

adminSchema.pre('save', async function(next) {
  console.log('user about to be saved', this);
  // Encrypt password
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password,salt)
  next();
})

adminSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({email});
  if (admin) {
    const auth = await bcrypt.compare(password, admin.password);
    if (auth) {
      return admin;
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

module.exports = mongoose.model("admin", adminSchema);
