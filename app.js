var express = require('express'),
    https = require('https'),
    travisPing = require('travis-ping'),
    execFile = require('child_process').execFile;

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/*',function(request, response, next) {
  response.set({
  'Content-Type': 'text/json'
});
  next();
});

app.post('/webhook', function(req, res) {
  travisPing.ping(
    {github_token : process.env.GITHUB_TOKEN},
    'kevee/monterey-open-space-campaign',
    {branch: 'master'},
    function(travisResponse) {
      res.write(JSON.stringify({ success : true }));
      res.end();
    }
  );
});

app.post('/build', function(req, res) {
  execFile('build.sh', function(error, out) {
    console.log(error);
    console.log(out);
  });
  res.write(JSON.stringify({ success : true }));
  res.end();
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
