var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/postController');

router.get('/', function(req, res){
    res.json('/api');
});

//get posts
router.get('/posts', post_controller.get_posts);

//create post
router.post('/posts', post_controller.create_post);

//delete all posts
router.delete('/posts', post_controller.delete_all_posts);

//get one post
router.get('/posts/:post_id', post_controller.get_post);

//edit post
router.put('/posts/:post_id', post_controller.put_post);

//delete post
router.delete('/posts/:post_id', post_controller.delete_post);

module.exports = router;
