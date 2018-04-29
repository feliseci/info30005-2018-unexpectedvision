const mongoose = require('mongoose');

const opportunitySchema = mongoose.Schema(
    {
        "name": String,
        "organiser": String,
        "description": String,
        "categories": [String],
        "image": String, // URL
        "date_post": {type: Date, default: Date.now},
        "date_event": Date,
        "location": String, // GPS? Address? GoogleMaps?
        "further_info": String
        /*"popularity": {type: Number, default: 0}, // Upvotes + comments*/
    }
);

// Note: Required attributes not specified; they're checked for at the text entry-level.

mongoose.model('opportunities', opportunitySchema);
