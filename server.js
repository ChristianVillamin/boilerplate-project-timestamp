// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/timestamp/', function(req, res) {
  const theDate = new Date();
  return res.json({ unix: theDate.getTime(), utc: theDate.toUTCString() });
});

const moment = require('moment');

// your first API endpoint...
app.get('/api/timestamp/:dater', (req, res) => {
  if (!moment(req.params.dater)) {
    return res.json({ unix: null, utc: 'Invalid Date' });
  }

  const thisDate = new Date(moment().format(req.params.dater));
  return res.json({ unix: thisDate.getTime(), utc: thisDate.toUTCString() });
});

const PORT = 5000;

// listen for requests :)
var listener = app.listen(PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
