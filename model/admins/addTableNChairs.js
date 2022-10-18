const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tableAndChairSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    label:{
      type: Number,
      required: true
    },
    chairs: {
      type: Object,
      required: true
    },
    status:{
      type: String,
      required: true
    },
    userId:{
      type: Schema.Types.Mixed, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('store', tableAndChairSchema)