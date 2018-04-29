/* Accessing the information from MLAB. */
const mongoose = require('mongoose');

/* Connect to MongoDB.*/
// DB Username: multiview, DB password: unexpectedvision
mongoose.connect('mongodb://multiview:unexpectedvision@ds161529.mlab.com:61529/unexpectedvision', function(err){
    if(!err) {
        console.log('Connected to mongo.');
    }
    else {
        console.log('Failed to connect to mongo.');
    }
});

require('./issues.js');