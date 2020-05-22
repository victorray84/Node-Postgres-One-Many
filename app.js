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

app.listen(process.env.PORT || 3000, () => {
  console.log("Getting started on port 8000!");
});
