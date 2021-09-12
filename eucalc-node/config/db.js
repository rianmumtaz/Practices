const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

const db = mongoose.connection;

module.exports = { connectToDB, db };
