const mongoose = require("mongoose");
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const userSchema = new Schema(
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
      validate:[isEmail, 'Please enter s vslid email']
    },
    password:{
      type: String,
      required:[true, 'Please enter padssword'],
      minlength:[6,'Password must be at least 6 characters']
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
  console.log('user about to be saved', this);
  // Encrypt password
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password,salt)
  next();
})

userSchema.static.login = async function (email, password) {
  const user = await this.findOne({email});
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

module.exports = mongoose.model("user", userSchema);
