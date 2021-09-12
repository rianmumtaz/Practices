const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

const db = mongoose.connection;

module.exports = { connectDB, db };
