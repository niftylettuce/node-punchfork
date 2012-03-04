
// # node-punchfork

// ## Rate Limit Status Test

var vows   = require('vows'),
    assert = require('assert'),
    apiKey = process.env.PUNCHFORK_API;

if (!apiKey) {
  console.log('To run vows, you must use a PUNCHFORK_API env var');
  process.exit(2);
}

var punchfork = require('../lib/main.js')(apiKey, 'node-punchfork tests');

vows.describe('rateLimitStatus test').addBatch({
  'Check number of remaining API calls allowed today': {
    topic: function() {
      punchfork.rateLimitStatus(this.callback);
    },
    'returns status': function(err, status) {
      assert.isNull(err);
      assert.isDefined(status);
      assert.isDefined(status.remaining_calls);
    }
  }
}).export(module, { error: false });
