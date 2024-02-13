const mongoose = require("mongoose");

const dbConnection = async (URI) => {
  await mongoose
    .connect(URI)
    .then((data) => console.log(`Connected to host:${data.connection.host}`))
    .catch((error) => console.log(error));
};

module.exports = dbConnection;
