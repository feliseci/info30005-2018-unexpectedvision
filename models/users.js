
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
        "likes": {type: Array, default: []}, // {id: Number, name: String i.e. liked issue name}
        "followedUsers": {type: [String], default: []}, // list of usernames of followed users
        "bookmarks": {type: Array, default: []},
        "posts": {type: Array, default: []}, // Posts the user created: {link: Number, content: String, article: String}
        "followingUsers": {type: [String], default: []}, // list of usernames of users following this user
        "articles": {type: Array, default: []}, // Articles the user created,
            // articleName: String, description: String, id: Number
        "opportunities": {type: Array, default: []}, // Opportunities the user created
            // name: String, link: Number
        "recent_update": {
            date: Date,
            updateType: String, // either "comment", "opportunity" or "article"; stored regardless of whether is editor
            updateContent: String, // the comment; otherwise, blank
            updateLink: Number, // the id of the article/opportunitu
            articleName: String
        }
    }
);

userSchema.plugin(passportLocalMongoose);
mongoose.model('users', userSchema);