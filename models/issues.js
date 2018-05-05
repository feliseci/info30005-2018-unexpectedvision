/*References: http://mongoosejs.com/docs/index.html
*             http://mongoosejs.com/docs/guide.html*/

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
/*const contributionSchema = mongoose.Schema(
    {
        "author": String, // author == editor manual check
        "comment": String,
        "date_post": {type: Date, default: Date.now},
        "popularity": {type: Number, default: 0}, // Upvotes + comments + clicks
        "article_url": String
        // unique IDs unnecessary as stored in array
    }
);*/

const issueSchema = new mongoose.Schema(
    {
        "name": String,
        "author": String,
        "description": String,
        "categories": [String],
        "image": String, // URL
        "date_post": {type: Date, default: Date.now},
        "date_update": {type: Date, default: Date.now},
        "popularity": {type: Number, default: 0}, // Upvotes + comments
        "hl_source": [String],
        "r_source": [String],
        "o_source": [String],
        "contributions": Array
/*        "contributions": {type: [contributionSchema], default: []} // TODO */
        /* "url": Number*/
        // Original format: url: "0",  // URL constructed from (site)/(type)/url (url = id)
    }
);

// Note: Required attributes not specified; they're checked for at the text entry-level.

// _id set to increment at each document addition with auto-increment;
// for ease of use with URLs
issueSchema.plugin(autoIncrement.plugin, 'issues'); // could use url instead if necessary
/*module.exports = */mongoose.model('issues', issueSchema);
/*mongoose.model('contributions', contributionSchema);*/
