
// # node-punchfork

// ## Test - Recipe Search

var vows   = require('vows'),
    assert = require('assert');

var apiKey = process.env.PUNCHFORK_API;

if (!apiKey) {
  console.log('To run vows, you must use a PUNCHFORK_API environment var');
  process.exit(2);
}

var punchfork = require('../lib/main.js')(apiKey, 'node-punchfork');

vows.describe('Recipe Search API').addBatch({
  'Simple recipe search query': {
    topic: function() {
      punchfork.recipeSearch({
        q: 'lettuce',
      }, this.callback);
    },
    'returns recipes': function(err, recipes) {
      assert.isNull(err);
      assert.isDefined(recipes);
    }
  },
  'Paid plan recipe search query': {
    topic: function() {
      punchfork.recipeSearch({
        ingred: 'true'
      }, this.callback);
    },
    'returns recipes': function(err, recipes) {
      // TODO: validate the results
      console.log("**NOTE**: work in progress");
    }
  },
  'Recipe search with limited results': {
    topic: function() {
      punchfork.recipeSearch({
        count: 20
      }, this.callback);
    },
    'returns recipes': function(err, recipes) {
      assert.isNull(err);
      assert.isDefined(recipes);
      assert.equal(recipes.count, 20);
    }
  },
  /*
  'Recipe search with paginated results': {
    topic: function() {
      punchfork.recipeSearch({
        cursor: '10' // TODO: is this the right type?
      }, this.callback);
    },
    'returns recipes': function(err, recipes) {
      console.log(err);
      console.log(recipes);
    }
  },
  */
  'Recipe search with sorted results': {
    topic: function() {
      punchfork.recipeSearch({
        sort: 'd'
      }, this.callback);
    },
    'returns recipes': function(err, recipes) {
      assert.isNull(err);
      assert.isDefined(recipes);
      // TODO: assert that its sorted by date using _.sort or something
    }
  },


}).export(module, { error: false });
