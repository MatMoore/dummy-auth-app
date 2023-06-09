var createError = require("http-errors");
var express = require("express");
const { auth, requiresAuth } = require("express-openid-connect");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

const config = {
  authRequired: false,
  baseURL: "https://dummy-auth-app.fly.dev",
  clientID: "dummy-app",
  issuerBaseURL: "https://zensso.sevos.io/realms/zenbarko",
  secret: process.env.CLIENT_SECRET || "YOUR_CLIENT_ID",
  idpLogout: true,
  routes: {
    postLogoutRedirect: "/",
  },
};

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// req.oidc.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.render("index", {
    title: "Zenbarko",
    loggedIn: req.oidc.isAuthenticated(),
  });
});

// The /profile route will show the user profile as JSON
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
*/

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
