var express = require('express');

var app = express();

app.use('/', express.static(__dirname));

// Start the server
app.listen(2222);