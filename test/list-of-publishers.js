
// # node-punchfork

// ## List of Publishers Test

var vows   = require('vows'),
    assert = require('assert'),
    apiKey = process.env.PUNCHFORK_API;

if (!apiKey) {
  console.log('To run vows, you must use a PUNCHFORK_API env var');
  process.exit(2);
}

var punchfork = require('../lib/main.js')(apiKey, 'node-punchfork tests');

vows.describe('listOfPublishers test').addBatch({
  'List all recipe publishers': {
    topic: function() {
      punchfork.listOfPublishers(this.callback);
    },
    'returns publishers': function(err, publishers) {
      assert.isNull(err);
      assert.isDefined(publishers);
    }
  }
}).export(module, { error: false });
