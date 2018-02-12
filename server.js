var express    = require('express');
var port       = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var router     = express.Router();

var configDB   = require('./config/db');

var Post     = require('./app/models/post');

mongoose.connect(configDB.url);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.route('/posts')
	.post(function(req, res) {
		
		var post = new Post();
        post.name = req.body.name;
        
        console.log(req.body.name);

		post.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Post created!' });
		});

		
	})
	.get(function(req, res) {
		Post.find(function(err, posts) {
			if (err)
				res.send(err);

			res.json(posts);
		});
    })
    .delete(function(req, res){
        Post.deleteMany(function(err, post) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });

        });
    })
router.route('/posts/:post_id')
	.get(function(req, res) {
		Post.findById(req.params.post_id, function(err, post) {
			if (err)
				res.send(err);
			res.json(post);
		});
	})
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
	.delete(function(req, res) {
		Post.remove({
			_id: req.params.post_id
		}, function(err, post) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);