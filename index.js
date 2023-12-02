// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami',function(req,res){
  let { rawHeaders } = req;
  let json = {};

  for(let i = 0; i <= rawHeaders.length; i++) {
      switch(rawHeaders[i]) {
          case 'Host':
              json['ipaddress'] = rawHeaders[i+1];
              break;
          case 'Accept-Language':
              json['language'] = rawHeaders[i+1];
              break;
          case 'User-Agent':
              json['software'] = rawHeaders[i+1];
              break;
      }
  }
  let sortedObj = {};

  Object.keys(json).sort((a,b) => {
    return a.localeCompare(b);
  }).forEach(key => sortedObj[key] = json[key])
  
  res.json(sortedObj);
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
