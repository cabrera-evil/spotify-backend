var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Load environment variables
require('dotenv').config();

// Load db config
require('./config/db.config');

// Load passport config
const passport = require('./config/passport.config');

var indexRouter = require('./routes/index.routes');
var usersRouter = require('./routes/users.routes');
var artistsRouter = require('./routes/artists.routes');
var albumRouter = require('./routes/albums.routes');
var authRouter = require('./routes/auth.routes');
var playlistRouter = require('./routes/playlists.routes');
var subscriptionRouter = require('./routes/subscription.routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/artists', artistsRouter);
app.use('/albums', albumRouter);
app.use('/auth', authRouter);
app.use('/playlists', playlistRouter);
app.use('/subscription', subscriptionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
