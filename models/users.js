/*References: http://mongoosejs.com/docs/index.html
*             http://mongoosejs.com/docs/guide.html*/
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema(
    {
        "username": String,
        "password": String,
        "display_name": String,
        "profile_description": {type: String, default: ""},
        "email": {type: String, default: ""},
        "is_editor": {type: Boolean, default: false},
        "likes": {type: Array, default: []},
        "followedUsers": {type: [String], default: []},
        "bookmarks": {type: Array, default: []},
        "posts": {type: Array, default: []}, // Posts the user created: {link: Number, content: String, article: String}
        "followingUsers": {type: [String], default: []},
        "articles": {type: Array, default: []}, // Articles the user created
        "opportunities": {type: Array, default: []}, // Opportunities the user created
        "recent_update": {
            date: Date,
            updateType: String, // either "comment", "opportunity" or "article"; stored regardless of whether is editor
            updateContent: String,
            updateLink: Number,
            articleName: String
        }
    }
);

userSchema.plugin(passportLocalMongoose);

// Note: Required attributes not specified; they're checked for at the text entry-level.
mongoose.model('users', userSchema);