require("dotenv").config();
require("express-async-errors");
const { logger: errLogger } = require("./middleware/loggers/error.logger");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

const { usersRouter } = require("./routes/users.router");
const { authRouter } = require("./routes/auth.router");
const { errorHandler } = require("./middleware/errorHandler.mw");
const logPath = path.join(__dirname, "logs", "http.log");
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  logger(":date --> :method :url :status :response-time ms", {
    stream: fs.createWriteStream(logPath, { flags: "a" }),
  })
);
app.use(cors());

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);

// Error middleware
app.use(errorHandler);

// Connection
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
