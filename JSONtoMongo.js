'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
var allListings = JSON.parse(fs.readFileSync('./listings.json', 'utf8'));

for (var i = 0, len = allListings.entries.length; i < len; i++) {
  var l = new Listing(allListings.entries[i]);

  console.log('Saving listing for: ' + l.code + ' ' + l.name);

  l.save(function(err) {
    if (err) throw err;
    console.log('Listing saved successfully. ');
  });
}

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */