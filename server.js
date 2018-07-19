var server_port =process.env.PORT || 8080;

let express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

//app.use(bodyParser.json());
app.get('/forecast', function(req, res) {
    // We'll fill this out later!
    res.json({ hello: 'JaiHanuman 1 2 3' });
});

app.listen(server_port, function(){
    console.log( "Listening on server_port " + server_port  );
    //JaiHanuman//Jai Sree Ram
});