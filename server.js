// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testdb'); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

// Bear models lives here
var Post     = require('./app/models/post');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/posts')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		
		var post = new Post();		// create a new instance of the Bear model
        post.name = req.body.name;  // set the bears name (comes from the request)
        
        console.log(req.body.name);

		post.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Post created!' });
		});

		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Post.find(function(err, posts) {
			if (err)
				res.send(err);

			res.json(posts);
		});
    })
    
    //delete all posts
    .delete(function(req, res){
        Post.deleteMany(function(err, post) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });

        });
    })

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/posts/:post_id')

	// get the bear with that id
	.get(function(req, res) {
		Post.findById(req.params.post_id, function(err, post) {
			if (err)
				res.send(err);
			res.json(post);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Post.findById(req.params.post_id, function(err, post) {

			if (err)
				res.send(err);

			post.name = req.body.name;
			post.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Post updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Post.remove({
			_id: req.params.post_id
		}, function(err, post) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);