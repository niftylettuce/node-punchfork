
# node-punchfork

Node.js library to access [Punchfork's API](http://punchfork.com/api).

## Quick start

```bash
npm install punchfork
```

## Example Usage

```js

// your-app-name is used as the request's User-Agent header
var punchfork = require('punchfork')('your-api-key', 'your-app-name');

// search for all recipes with lettuce
punchfork.recipeSearch({
  q: 'lettuce'
}, function(err, recipes) {
  if (err) return console.log(err);
  console.log('recipes:', recipes);
  return;
});

```

## API

All methods take a callback as their last parameter.

The callback is called with an error code if needed, and then the repsonse.

* `punchfork.recipeSearch(options)` - same as what you'd type into search box
at <http://punchfork.com>
* `punchfork.randomRecipe` - a recipe selected at random from database
* `punchfork.listOfPublishers` - lists all recipe publishers on Punchfork
* `punchfork.generateSearchIndex(options)` (Ultra API only) - list of generated
search index terms for the input recipe
* `punchfork.rateLimitStatus` - the number of remaining API calls allowed today
for the given API key

More information on the API is available at <http://punchfork.com/api>.

## Tests

To run tests, install `vows`:

```bash
npm install vows
```

Then run:

```bash
PUNCHFORK_API=your-api vows test/*
```

## Contributors

* Nick Baugh <niftylettuce@gmail.com>
* Mark Lussier <mlussier@gmail.com>

## License

MIT Licensed
