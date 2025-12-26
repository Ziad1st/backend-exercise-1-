const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const verifyJWT = require("./middlewares/verifyJWT");

const app = express();

// built-in middleware
app.use(express.json());

// third-party middleware
// app.use(cors());
app.use(cookieParser());

// routes
app.use("/auth", require("./routes/authRoute"));
app.use("/posts", verifyJWT, require("./routes/postRoute"));
app.use("/users", verifyJWT, require("./routes/usersRoute"));

// error handler (آخر حاجة)
app.use(errorHandler);

module.exports = app;
