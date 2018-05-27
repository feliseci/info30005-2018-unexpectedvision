
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const issueSchema = new mongoose.Schema(
    {
        "name": String,
        "author": String,
        "description": String,
        "categories": [String],
        "image": String, // URL
        "date_post": {type: Date, default: Date.now},
        "popularity": {type: Number, default: 0}, // Upvotes
        "hl_source": Array, // {description: String, link: String}
        "r_source": Array,
        "o_source": Array,
        "contributions": Array, // {author: String, comment: String, article_url: String}
        "recent_update": {
            date: Date,
            updateType: String, // "comment", "edit'
            updateContent: String // comment content
        }
        // URL constructed from (site)/issue/:id (as in, _id, ObjectId)
        // Note: Required attributes not specified; they're checked for at the client-end.
    }
);

// _id set to increment at each document addition with autoIncrement, for ease of use with URLs
issueSchema.plugin(autoIncrement.plugin, 'issues');
mongoose.model('issues', issueSchema);
