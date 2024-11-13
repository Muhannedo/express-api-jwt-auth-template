require("dotenv").config();
require("./config/database");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//controllers
const testJWTRouter = require("./controllers/test-jwt");
const usersRouter = require("./controllers/users");
const profilesRouter = require("./controllers/profiles");
const verifyToken = require("./middleware/verify-token");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//public routes
app.use("/test-jwt", testJWTRouter);
app.use("/users", usersRouter);

//anything below this is protected routes
app.use(verifyToken);
// Routes go here
app.use("/profiles", profilesRouter);

app.listen(3000, () => {
  console.log("The express app is ready!");
});
