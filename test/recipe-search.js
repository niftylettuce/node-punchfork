
// # node-punchfork

// ## Recipe Search Tests

var vows   = require('vows'),
    assert = require('assert'),
    apiKey = process.env.PUNCHFORK_API;

if (!apiKey) {
  console.log('To run vows, you must use a PUNCHFORK_API env var');
  process.exit(2);
}

var punchfork = require('../lib/main.js')(apiKey, 'node-punchfork tests');

vows.describe('recipeSearch tests').addBatch({
  'Simple recipe search query': {
    topic: function() {
      punchfork.recipeSearch({
        q: 'lettuce'
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
      // TODO: assert that recipes are sorted by date using _.sort or something
    }
  },
  'Recipe search with results from a single publisher': {
    topic: function() {
      punchfork.recipeSearch({
        from: 'The Pioneer Woman'
      }, this.callback);
    },
    'returns recipes': function(err, recipes) {
      assert.isNull(err);
      assert.isDefined(recipes);
      // TODO: assert that recipes are only from the publisher
    }
  },
  'Recipe search with results that a single user likes': {
    topic: function() {
      punchfork.recipeSearch({
        likes: 'niftylettuce'
      }, this.callback);
    },
    'returns recipes': function(err, recipes) {
      assert.isNull(err);
      assert.isDefined(recipes);
      // TODO: assert that recipes are ones only liked by the user
    }
  },
  'Recipe search with results published on or after a date': {
    topic: function() {
      punchfork.recipeSearch({
        startdate: new Date('January 1, 2012')
      }, this.callback);
    },
    'returns recipes': function(err, recipes) {
      assert.isNull(err);
      assert.isDefined(recipes);
      // TODO: assert that recipes are from after or on the startdate
    }
  },
  'Recipe search with results published on or before a date': {
    topic: function() {
      punchfork.recipeSearch({
        enddate: new Date('January 1, 2012')
      }, this.callback);
    },
    'returns recipes': function(err, recipes) {
      assert.isNull(err);
      assert.isDefined(recipes);
      // TODO: assert that recipes are from before or on the enddate
    }
  },
  'Recipe search that returns total number of recipes for a query': {
    topic: function() {
      punchfork.recipeSearch({
        q: 'lettuce',
        total: true
      }, this.callback);
    },
    'returns recipes': function(err, recipes) {
      assert.isNull(err);
      assert.isDefined(recipes);
      assert.isDefined(recipes.total);
    }
  },
  'Recipe search that returns recipes filtered for dietary requirements: vegetarian': {
    topic: function() {
      punchfork.recipeSearch({
        q: 'vegetarian'
      }, this.callback);
    },
    'returns recipes': function(err, recipes) {
      assert.isNull(err);
      assert.isDefined(recipes);
    }
  },
  'Recipe search that returns recipes filtered for dietary requirements: vegan': {
    topic: function() {
      punchfork.recipeSearch({
        q: 'vegan'
      }, this.callback);
    },
    'returns recipes': function(err, recipes) {
      assert.isNull(err);
      assert.isDefined(recipes);
    }
  }  
}).export(module, { error: false });
