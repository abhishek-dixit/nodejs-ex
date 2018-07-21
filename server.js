var server_port =process.env.PORT || 8080;

let express = require('express'),
    bodyParser = require('body-parser'),
    // circularJSON = require('circular-json'),
    app = express();

    // let alexaVerifier = require('alexa-verifier'); // at the top of our file

    // function requestVerifier(req, res, next) {
    //     alexaVerifier(
    //         req.headers.signaturecertchainurl,
    //         req.headers.signature,
    //         req.rawBody,
    //         function verificationCallback(err) {
    //             if (err) {
    //                 res.status(401).json({ message: 'Verification Failure', error: err });
    //             } else {
    //                 next();
    //             }
    //         }
    //     );
    // }
    
    app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({extended: true}));
    app.post('/forecast', function(req, res) {
    console.log( "/forecast called ");
    
  console.log(req.body);
   if (req.body.request.type === 'LaunchRequest') 
  {
    res.json({
      "access_token":req.context.System.user.accessToken,
      "version": "1.0",
      "response": {
        "shouldEndSession": true,
        "outputSpeech": {
          "type": "SSML",
          "ssml": "<speak>Hmm <break time=\"1s\"/> Jai Hanuman</speak>"
        }
      }
    });
  }
});

app.get('/', function(req, res) {
console.log("Root Called..");
   res.json({
    "RESPONSE FROM OPENSHIFT": "System is UP", 
  });
});

app.listen(server_port, function(){
  console.log( "Listening on server_port " + server_port  );
  //JaiHanuman//Jai Sree Ram
});