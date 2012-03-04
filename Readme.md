
# node-punchfork

**NOTE**: THIS IS A WORK IN PROGRESS, UNSTABLE, DO NOT TRY USING!

Node.js library to access [Punchfork's API](http://punchfork.com/api).

## Quick start

```bash
npm install punchfork
```

## Example Usage


## API

All methods take a callback as their last parameter.

The callback is called with an error code if needed, and then the repsonse.

* `punchfork.recipeSearch`
* `punchfork.randomRecipe`
* `punchfork.listOfPublishers`
* `punchfork.generateSearchIndex`
* `punchfork.rateLimitStatus`

## Tests

To run tests, install `vows`:

```bash
npm install vows
```

Then run:

```bash
PUNCHFORK_API=your-api vows test/*
```

## Creator

@niftylettuce

## License

MIT Licensed
