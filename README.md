# lodash-y [![Build Status][2]][1]

`lodash-y` is a collection of [lodash](https://github/lodash/lodash) mixins.

For available functionality, see
* [src/mixins](src/mixins)
* [src/mixins-browser](src/mixins-browser)
* [src/mixins-node](src/mixins-node)

## Example

```javascript
// use as a lodash superset
import _ from 'lodash-y';
```

```javascript
// mix in all functions
import _ from lodash;
import {
  mixins as yMixins
} from 'lodash-y';

_.mixin(yMixins);
```

```javascript
// mix in only specific functions
import _ from lodash;
import promisify from 'lodash-y/lib/mixins/promisify';

_.mixin({promisify});
```

## License

[Apache 2.0](LICENSE)


  [1]: https://github.com/ysoftwareab/lodash-y/actions?query=workflow%3ACI+branch%3Amaster
  [2]: https://github.com/ysoftwareab/lodash-y/workflows/CI/badge.svg?branch=master
