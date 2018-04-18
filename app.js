// Make sure Node.js is enabled in your Settings before running.
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');

const router = require('./routes/routes');

app.use(router);
app.use(express.static('./views')); // Needed for CSS to work, there may be a better way

// Starts the server.
app.listen(PORT, function() {
    console.log(`Server started at port ${PORT}`);
});