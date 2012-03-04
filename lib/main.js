
//     node-punchfork
//     Copyright (c) 2012 Nick Baugh <niftylettuce@gmail.com>
//     MIT Licensed

// Open source node.js module for accessing Punchfork's API:
// <http://punchfork.com/api>

// * Author: [@niftylettuce](https://twitter.com/#!/niftylettuce)
// * Source: <https://github.com/niftylettuce/node-punchfork>

// Inspired by `node-stripe` <https://github.com/abh/node-stripe>

// # node-punchfork

// Here are the `punchfork` methods returned from using `require('punchfork')`.
// You _must_ pass your `apiKey` string from <http://punchfork.com/api>.
//  (e.g. `var punchfork = require('punchfork')('hs0x9kb69n5v6dj');`)
// The `options` object is optional, but allows you to provide a custom config.
// All methods returned use a callback (`cb`), as their last parameter.
// This `cb` is called with an error code (if any) and then the response.
// You _must_ refer to <http://punchfork.com/api> for your `data` objects.

var querystring = require('querystring'),
    version = '0.0.1';

function responseHandler(req, callback) {
  if (typeof callback !== "function") {
    console.log("missing callback");
    return;
  }
  req.on('response', function(res) {
    var response = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      response += chunk;
    });
    res.on('end', function() {
      var err = 200 == res.statusCode ? null : res.statusCode;
      try {
        response = JSON.parse(response);
      }
      catch(e) {
        err = 1;
        response = { error : { message : "Invalid JSON from stripe.com" } };
      }
      err && (err = { statusCode: err, response: response });
      callback(err, response);
    });
  });
}

module.exports = function(apiKey, appName, https) {

  if(typeof apiKey !== 'string') {
    console.log('node-punchfork api key not defined');
    return;
  }

  if(typeof appName !== 'string' && appName !== null) {
    console.log('node-punchfork application name not defined');
    return;
  }

  function prepareRequest(method, path, data, cb) {

    if (typeof cb !== 'function') {
      console.log('node-punchfork missing callback');
      return;
    }

    Object.keys(data).forEach(function(key) {
      if (typeof data[key] === 'object' && data[key] !== null) {
        var o = data[key];
        delete data[key];
        Object.keys(o).forEach(function(k) {
          var new_key = key + "[" + k + "]";
          data[new_key] = o[k];
        });
      }
    });

    var requestData = querystring.stringify(data);
    requestData = 'key=' + apiKey + '&' + requestData;

    var headers = {
      'Accept'           : 'application/json',
      'User-Agent'       : appName,
      'X-Node-Punchfork' : version
    };

    var post = false;
    switch (method) {
      case 'POST':
        headers['Content-Length'] = requestData.length;
        headers['Content-Type']   = 'application/x-www-form-urlencoded';
        //var auth = 'Basic ' + new Buffer(apiKey + ":").toString('base64');
        //headers.Authorization = auth;
        post = true;
        break;
      case 'GET':
        path = path + '?' + requestData;
        break;
    }

    var http, port;
    if (https) {
      http = require('https');
      port = '443';
    } else {
      http = require('http');
      port = '80';
    }

    var requestOptions = {
      host    : 'api.punchfork.com',
      port    : port,
      path    : path,
      method  : method,
      headers : headers
    };

    var req = http.request(requestOptions);
    responseHandler(req, cb);
    if (post) req.write(requestData);
    req.end();

  };

  // # Methods
  var get = function(path, data, cb) {
    prepareRequest('GET', path, data, cb);
  };
  var post = function(path, data, cb) {
    prepareRequest('POST', path, data, cb);
  };

  return {

    // # Recipe Search
    recipeSearch: function(data, cb) {
      get('/recipes', data, cb);
    },

    // # Random Recipe
    randomRecipe: function(data, cb) {
      get('/random_recipe', data, cb);
    },

    // # List of Publishers
    listOfPublishers: function(data, cb) {
      get('/publishers', data, db);
    },

    // # Generate Search Index
    generateSearchIndex: function(data, cb) {
      get('/search_index', data, db);
    },

    // # Rate Limit Status
    rateLimitStatus: function(data, cb) {
      get('/rate_limit_status', data, db);
    }

  };

};
