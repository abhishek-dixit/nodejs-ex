var accountFetched = false;
var userName = "";
var userEmail = "";
var server_port = process.env.PORT || 8080;
var accessToken;
const https = require('https');
let express = require('express'),
  bodyParser = require('body-parser'),

  app = express();


app.use(bodyParser.json());
app.post('/forecast', function (req, res) {
  console.log("/forecast called ");
  console.log(req.body.request.type);

  if (req.body.request.type === 'LaunchRequest') {
    console.log("Launch Request");

    res.json({
      "version": "1.0",
      "response": {
        "shouldEndSession": false,
        "outputSpeech": {
          "type": "SSML",
          // "ssml": "<speak>Hmm <break time=\"1s\"/> Jai Hanuman</speak>"
          "ssml": "<speak>Welcome</speak>"
        }
      }
    });

  } else if (req.body.request.type === 'SessionEndedRequest') {
    console.log("Session End Request");
    res.json({
      "version": "1.0",
      "response": {
        "shouldEndSession": true,
        "outputSpeech": {
          "type": "SSML",
          "ssml": "<speak> Thank You </speak>"
        }
      }
    });
  } else if (req.body.request.type === 'IntentRequest') {
    console.log("Intent Request");
    console.log(req.body.request.intent.name);

    if (req.body.request.intent.name === "AMAZON.StopIntent") {

    } else {

      if (accountFetched == false) {
        getUserProfile(req);
      }

      var devLocation = req.body.request.intent.slots.device_location.value;
      var devName = req.body.request.intent.slots.device_name.value;
      var devState = req.body.request.intent.slots.device_state.value;
      var actionRes = "Sure " + userName + " , <break time=\"1s\"/> Turning " + devState + " the " + devName + " at " + devLocation;
      console.log(actionRes);

      res.json({
        "version": "1.0",
        "response": {
          "shouldEndSession": false,
          "outputSpeech": {
            "type": "SSML",
            "ssml": "<speak>" + actionRes + "</speak>"
          }
        }
      });
    }
  }
});

app.get('/', function (req, res) {
  console.log("Root Called..");
  //getUserProfile('Atza|IwEBILbYT9hi9HxySaL9OR0B1ImH-KKLyj7SKtfCBEvpdysxtvfkY1ySb2waqUh78bY-s939HCx7IeuXZ4MgpMsGlw-2F-yxTgbRk6oTMNete5ZDCSrtXIDKHb0IXlH6-E-zMHF0DL5h3Ki8gkT2TXW-T9NCVI-C9XAp9lE9G3y589yTmrDA2dQyD0wTx8_YP7CIjrSETLw2EtBxuPX83QmQmg-qYIoZd_ZRAyInESvkdJe6qM3H75J_B0RYZBNgJM8QPCG_oFhuC0ts1O88-1zsmTslxy2KB1NCjT5yg0m4Wty-mgFPYfUSqw6LliemqCGOynFRWDRtZGFCfghe4P-od0G30QZdl4nMe8GXVKlTC9Oqg4r_r0LWlEHnvjk8mrFL_Rgt3NsmyJjGOfMovBY2INYA0PGHUvLN-A-JurYn86fB2PjBtt2h2uEGGsKTk6hrsyobfifCRw4elVAiwo02vg_UN1pI7OYeP1DJP2FDz0CBbdMrGhvIJtUqH6omQ1vketmjfZq6t7ZcGaytIq8r3JoNl2s1_Xmvl8kKMLurhERJNAqMbd_5_6nD35avM1LJZeM');
  res.json({
    "RESPONSE FROM OPENSHIFT": "System is UP",
  });
});

app.listen(server_port, function () {
  console.log("Listening on server_port " + server_port);
  //JaiHanuman//Jai Sree Ram
});

var unirest = require('unirest')
function getUserProfile(req) {
  var accessToken = req.body.context.System.user.accessToken;
  console.log("Fetching user profile");
  // GET a resource
  var url = 'https://api.amazon.com/user/profile?access_token=' + accessToken;
  unirest.get(url)
    // .query({ 'foo': 'bar' })
    // .query({ 'stack': 'overflow' })
    .end(function (res) {
      if (res.error) {
        console.log('GET error', res.error)
      } else {
        console.log('GET response', res.body)
        userName = res.body.name;
        userEmail = res.body.email;
        accountFetched = true;
      }
    })
};