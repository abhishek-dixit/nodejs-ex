let express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json());
app.post('/forecast', function(req, res) {
    // We'll fill this out later!
    res.json({ hello: 'world' });
});
app.listen(3000);