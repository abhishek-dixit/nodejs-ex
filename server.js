// var port = process.env.PORT || 8080;
var server_ip = process.env.IP || 8080;

let express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

// app.use(bodyParser.json());
// app.post('/forecast', function(req, res) {
//     // We'll fill this out later!
//     res.json({ hello: 'world' });
// });


var server_port =process.env.PORT || 8080;

//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

//app.use(bodyParser.json());
app.get('/forecast', function(req, res) {
    // We'll fill this out later!
    res.json({ hello: 'world'+server_ip });
});

// app.listen(server_port, server_ip_address, function () {
//     console.log( "Listening on " + server_ip_address + ", server_port " + server_port  );
// });

app.listen(server_port);