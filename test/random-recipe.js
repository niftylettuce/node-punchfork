
// # node-punchfork

// ## Random Recipe Test

var vows   = require('vows'),
    assert = require('assert'),
    apiKey = process.env.PUNCHFORK_API;

if (!apiKey) {
  console.log('To run vows, you must use a PUNCHFORK_API env var');
  process.exit(2);
}

var punchfork = require('../lib/main.js')(apiKey, 'node-punchfork tests');

vows.describe('randomRecipe test').addBatch({
  'Search for a random recipe': {
    topic: function() {
      punchfork.randomRecipe(this.callback);
    },
    'returns recipes': function(err, recipes) {
      assert.isNull(err);
      assert.isDefined(recipes);
    }
  }
}).export(module, { error: false });
