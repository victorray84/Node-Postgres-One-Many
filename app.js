require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const gradRoutes = require("./routes/grads");
const offerRoutes = require("./routes/offers");

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use("/graduates", gradRoutes);
app.use("/", offerRoutes);

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// catch 404 and forward to error handler

app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  return next(err);
});

// development error handler
// will print stacktrace

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    error: err,
  });
});

//postgres://rliylvrkildwxr:9d5269b5a5b6346cc0f69c9a5f992097dc9233d5a4dff7d600473d0d8d3a55f7@ec2-54-165-36-134.compute-1.amazonaws.com:5432/det7cf4ii66ifv
app.listen(process.env.PORT || 3000, () => {
  console.log("Getting started on port 8000!");
});
