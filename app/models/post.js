var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
    name: { type: String, unique: true, required: true }
});

module.exports = mongoose.model('Post', PostSchema);