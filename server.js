// var accountFetched = false;
var unirest = require('unirest')

var server_port = process.env.PORT || 8080;
var accessToken;
const https = require('https');
let express = require('express'),
  bodyParser = require('body-parser'),

  app = express();


app.use(bodyParser.json());
app.post('/', function (req, res) {
  fbInit();
  fbLogout();
  fbLogin();
  
  var intentName = "no_intent";
  console.log("end point called ");
  console.log(req.body.request.type);
  if (req.body.request.hasOwnProperty('intent')) {
    if (req.body.request.intent.hasOwnProperty('name')) {
      intentName = req.body.request.intent.name;
      console.log(intentName);
    }
  }


  if (req.body.request.type === 'LaunchRequest') {
    console.log("Launch Request >>");
    // console.log(req.body.request.intent.name);

    res.json({
      "version": "1.0",
      "response": {
        "shouldEndSession": false,
        "outputSpeech": {
          "type": "SSML",
          // "ssml": "<speak>Hmm <break time=\"1s\"/> Jai Hanuman</speak>"
          "ssml": "<speak>Welcome User</speak>"
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
          "ssml": "<speak>Session Ended </speak>"
        }
      }
    });
  } else if (req.body.request.type === 'IntentRequest') {

    console.log("Intent Request >>>");
    // console.log(req.body.request.intent.name);

    if ("AMAZON.CancelIntent" === intentName) {
      console.log("Intent Request >>> Cancel");

      res.json({
        "version": "1.0",
        "response": {
          "shouldEndSession": true,
          "outputSpeech": {
            "type": "SSML",
            "ssml": "<speak>Cancelled Operation. Thank You.</speak>"
          }
        }
      });
    } else if ("AMAZON.StopIntent" === intentName) {
      console.log("Intent Request >>> Stop");

      res.json({
        "version": "1.0",
        "response": {
          "shouldEndSession": true,
          "outputSpeech": {
            "type": "SSML",
            "ssml": "<speak>Stopped Operation. Thank You.</speak>"
          }
        }
      });
    } else {
      console.log("Intent Request >>> Valid");
      if (intentName !== "") {
        console.log(intentName);
      }
      var userName = getUserProfile(req);
      var actionRes = "";


      console.log(actionRes);

      if (intentName === "control_lights") {
        var devLocation = req.body.request.intent.slots.device_location.value;
        var devName = req.body.request.intent.slots.device_name.value;
        var devState = req.body.request.intent.slots.device_state.value;
        actionRes = "Sure " + userName + " , <break time=\"1s\"/> Turning " + devState + " the " + devName + " at " + devLocation;
      } else if (intentName === "control_curtains") {
        var curtainLocation = req.body.request.intent.slots.curtain_location.value;
        //var devName = req.body.request.intent.slots.device_name.value;
        var curtainState = req.body.request.intent.slots.curtain_state.value;
        if (curtainState.toLowerCase() === "open") {
          actionRes = "Sure " + userName + " , <break time=\"1s\"/> Opening curtains at " + curtainLocation;
        } else {
          actionRes = "Sure " + userName + " , <break time=\"1s\"/> Closing curtains at " + curtainLocation;
        }
      }

      res.json({
        "version": "1.0",
        "response": {
          "shouldEndSession": true,
          "outputSpeech": {
            "type": "SSML",
            "ssml": "<speak>" + actionRes + "</speak>"
          }
        }
      });
      //Connect here to firebase and get matching devices id for now:

    }

  }
});

app.get('/ping', function (req, res) {
  console.log("Ping Called..");
  res.json({
    "RESPONSE FROM OPENSHIFT": "System is UP",
  });
});

app.listen(server_port, function () {
  console.log("Listening on server_port " + server_port);
  //JaiHanuman//Jai Sree Ram
});


function getUserProfile(req) {
  var userName = "";
  var userEmail = "";
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
    });
  return userName;
};

//**********************Firebase Starts *///////////////////////
var firebase = require("firebase");
var config = {
  apiKey: " AIzaSyCZ07-V9EBaMEMHjtBDbPFzoREHZtOrPEQ",
  authDomain: "alivesystems-4b12c.firebaseapp.com",
  databaseURL: "https://alivesystems-4b12c.firebaseio.com",
  storageBucket: "alivesystems-4b12c.appspot.com",
};

// var storage = firebase.storage();
var auth;
var fbInitDone = false;
function fbInit() {
  if (fbInitDone === true) {
    return;
  }
  fbInitDone = true;
  firebase.initializeApp(config);
  auth = firebase.auth();
  auth.onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log("Logged In.");
      console.log(displayName);
      console.log(email);
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
}

// Get a reference to the storage service, which is used to create references in your storage bucket


function fbLogin() {
  auth.signInWithEmailAndPassword("scorpion141981@gmail.com", "abhi141981").catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error("Login Failed !!!! ");
    console.error(errorMessage);
    // ...
  });
};

function fbLogout() {
  // auth.loo("scorpion141981@gmail.com", "abhi141981").catch(function (error) {

  // });
};


//**********************Firebase Ends *///////////////////////