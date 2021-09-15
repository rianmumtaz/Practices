const mongoose = require("mongoose");

const connectFunc = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};
const db = mongoose.connection;

module.exports = { connectFunc, db };
