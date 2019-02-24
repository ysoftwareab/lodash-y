import __ from 'lodash';
import _mixins from './mixins';

export let mixins = __.reduce(_mixins, function(mixins, mixinModule) {
  mixinModule = `./mixins/${mixinModule}`;

  // eslint-disable-next-line global-require
  mixinModule = require(mixinModule);

  mixins = __.merge(mixins, __.omit(mixinModule, [
    'default'
  ]));

  return mixins;
}, {});

// eslint-disable-next-line firecloud/no-underscore-prefix-exported
export let _ = (function() {
  let vanillaLodash = __.runInContext();
  vanillaLodash.mixin(mixins);
  return vanillaLodash;
})();

export default _;
