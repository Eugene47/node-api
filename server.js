var express    = require('express');
var app        = express();
var port       = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');

var configDB   = require('./config/db');

var index = require('./app/routes/index');
var posts = require('./app/routes/posts');

mongoose.connect(configDB.url);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

app.use('/', index);
app.use('/api', posts);

app.listen(port);
console.log('Magic happens on port ' + port);