
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const opportunitySchema = new mongoose.Schema(
    {
        "name": String,
        "organiser": String,
        "description": String,
        "categories": [String],
        "image": String, // URL
        "date_post": {type: Date, default: Date.now},
        "date_event": Date,
        "location": String,
        "further_info": String, // URL
        "popularity": {type: Number, default: 0} // Up-votes
    }
);

// Note: Required attributes not specified; they're checked for at the text entry-level.
opportunitySchema.plugin(autoIncrement.plugin, 'opportunities');
mongoose.model('opportunities', opportunitySchema);
