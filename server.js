let express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.post('/forecast', requestVerifier, function(req, res) {
  if (req.body.request.type === 'LaunchRequest') {
    res.json({
      "version": "1.0",
      "response": {
        "shouldEndSession": true,
        "outputSpeech": {
          "type": "SSML",
          "ssml": "<speak>Hmm <break time=\"1s\"/> What day do you want to know about?</speak>"
        }
      }
    });
  }
});