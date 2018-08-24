var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  // Write the path that was requested to the console
  console.log('Handling request for: ' + parsedUrl.path);
   
  // If the requested path is exactly equal to '/listings', send the JSON that we stored in listingData
  if (parsedUrl.path == '/listings')
    response.end(listingData);
  else {
    // Otherwise, send a 404 error with the message 'Bad gateway error'
    response.writeHead (404, {
    'Content-Length': 17,
    'Content-Type': 'text/plain' }); 
    response.end('Bad gateway error');
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {

  // Save the data that was read from disk in the listingData variable
  listingData = data;

  var server = http.createServer(requestHandler);

  // And start the server that we just created
  server.listen(port, function() {
    console.log('Server listening on: http://127.0.0.1:' + port);
  });  
});
