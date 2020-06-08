const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");

// Config .env to ./config/config.env
require("dotenv").config({
  path: "./config/config.env",
});

// Connect to database.
connectDB();

const app = express();

// Config body parser
app.use(express.json());

// Config for only development
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );

  app.use(morgan("dev"));
}

// Load all routes
const authRouter = require("./routes/auth.route");

// Use Routes
app.use("/api/", authRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
