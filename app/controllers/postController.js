var Post = require('../models/post');

exports.get_posts = function(req, res){
    Post.find(function(err, posts) {
        if (err)
            res.send(err);

        res.json(posts);
    });
}

exports.create_post = function(req, res){
    var post = new Post();
    post.name = req.body.name;
    
    console.log(req.body.name);

    post.save(function(err) {
        if (err){
            res.send(err);
        }else{
            res.json({ message: 'Post created!' });
        }
    });
}

exports.delete_all_posts = function(req, res){
    Post.deleteMany(function(err, post) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });

    });
}

exports.get_post = function(req, res){
    Post.findById(req.params.post_id, function(err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
}

exports.put_post = function(req, res){
    Post.findById(req.params.post_id, function(err, post) {
        post.name = req.body.name;
        post.save(function(err) {
            if (err){
                res.send(err);
            }else{
                res.json({ message: 'Post updated!' });
            }
        });
    });
}

exports.delete_post = function(req, res){
    Post.remove({
        _id: req.params.post_id
    }, function(err, post) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}