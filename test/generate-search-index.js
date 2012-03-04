
// # node-punchfork

// ## Generate Search Index Test (Ultra API feature)

var vows   = require('vows'),
    assert = require('assert'),
    apiKey = process.env.PUNCHFORK_API;

if (!apiKey) {
  console.log('To run vows, you must use a PUNCHFORK_API env var');
  process.exit(2);
}

var punchfork = require('../lib/main.js')(apiKey, 'node-punchfork tests');

vows.describe('generateSearchIndex test').addBatch({
  'Generate search index for a recipe': {
    topic: function() {
      var ingred = '';
      ingred += 'Onion';
      ingred += '\n Yellow Onion';
      punchfork.generateSearchIndex({
        title: 'French Onion Soup',
        ingred: ingred
      }, this.callback);
    },
    'returns search terms for recipe': function(err, recipes) {
      // TODO: this with Ultra API check
    }
  }
}).export(module, { error: false });
