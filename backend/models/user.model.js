const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    nameame: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "_id",
    },
    position: {
      type: String,
    },
    additionalDetail: {
      type: String,
    },
    address: {
      type: Object,
      properties: {
        street: {
          type: String,
        },
        state: {
          type: String,
        },
        city: {
          type: String,
        },
        pincode: {
          type: Number,
        },
        country: {
          type: String,
        },
      },
    },
    phone: {
      type: Number,
    },
    website: {
      type: String,
    },
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    summary: {
      type: String,
    },
    industry: {
      type: String,
    },

    connections: {
      type: [String],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
