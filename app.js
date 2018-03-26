// Make sure Node.js is enabled in your Settings before running.
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

const router = require('./routes/routes');

app.use(router);

// Starts the server.
app.listen(PORT, function() {
    console.log(`Server started at port ${PORT}`);
});