const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'target')));
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('listening on port ', server.address().port);
});
