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
        "email": String,
        "is_editor": {type: Boolean, default: false}
        /* "posts": [Number],
        "followed_issues": [String],
        "followed_categories": [String],
        "followed_users": [String],*/
    }
);

userSchema.plugin(passportLocalMongoose);

// Note: Required attributes not specified; they're checked for at the text entry-level.
mongoose.model('users', userSchema);