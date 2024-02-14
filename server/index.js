const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/config.env" });
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
const PORT = process.env.PORT || 3000;
const URI = process.env.URI;
const cookieParser = require("cookie-parser");
const file = require("express-fileupload");
const bodyParser = require("body-parser");
const dbConnection = require("./config/dbConnection");
const error = require("./middlewares/error");
const UserRouter = require("./routes/UserRoute");
const BlogRoute = require("./routes/BlogRoute");
const cloudinary = require("cloudinary");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(file());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", UserRouter);
app.use("/api/v1", BlogRoute);
app.use(error);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

dbConnection(URI);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled rejections
process.on("unhandledRejection", (promise, e, reason) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);

  console.log(`Shutting down server due to unhandledRejection`);
  console.log(`${e.message}`);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (e) => {
  console.log(`Error : ${e.message}`);
  console.log(`Shutting down server due to uncaughtException`);
  server.close(() => {
    process.exit(1);
  });
});
