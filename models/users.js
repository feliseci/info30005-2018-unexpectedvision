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
        "posts": {type: Array, default: []},
        "followingUsers": {type: [String], default: []}
    }
);

userSchema.plugin(passportLocalMongoose);

// Note: Required attributes not specified; they're checked for at the text entry-level.
mongoose.model('users', userSchema);