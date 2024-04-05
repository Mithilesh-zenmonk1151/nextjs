const mongoose = require("mongoose");
require("dotenv").config();
const MONGODBURL = process.env.MONGODB_URL;
exports.connect = () => {
  mongoose.connect(MONGODBURL, {
      useUnifiedTopology: true,
    })
    .then(console.log(`DB Connection Success`))
    .catch((err) => {
      console.log(`DB Connection Failed`);
      console.log(err);
      process.exit(1);
    });
};
