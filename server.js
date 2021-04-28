const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
import logger from "morgan";
// import { config } from "dotenv";
import passport from 'passport';
import cookieParser from 'cookie-parser';
import errorHandler from "./middleware/errorHandler";
import { NotFoundError } from "./helpers/errors";
import authRouter from "./routes/auth.route";

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require("./routes/apiRoutes");

// Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
if (["development", "production"].includes(process.env.NODE_ENV)) {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())


passport.initialize()

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactrecipes",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
// Use apiRoutes
app.use("/api", apiRoutes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// app.get("/", (_, res) => {
//   res.status(200).json({
//     status: "success",
//     message: "Bonjour, Welcome, E Kaabo",
//   });
// });

// app.all("*", (_, res) => {
//   throw new NotFoundError('Resource not found on this server')
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRouter);

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
