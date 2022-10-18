const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const queueSchema = new Schema(
  {
    queueNumber: {
      type: Number,
      required: true,
    },
    queuePersons: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("queue", queueSchema);
