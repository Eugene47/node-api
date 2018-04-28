var express    = require('express');
var app        = express();
var port       = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var morgan     = require('morgan');


var configDB   = require('./config/db');

var index = require('./app/routes/index');
var posts = require('./app/routes/posts');


app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', index);
app.use('/api', posts);

app.listen(port);
console.log('Magic happens on port ' + port);