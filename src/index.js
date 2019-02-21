import __ from 'lodash';
import _mixins from './mixins';

export let mixins = __.mapValues(_mixins, function(mixinModule) {
  mixinModule = `./mixins/${mixinModule}`;

  // eslint-disable-next-line global-require
  return require(mixinModule).default;
});

// eslint-disable-next-line firecloud/no-underscore-prefix-exported
export let _ = (function() {
  let vanillaLodash = __.runInContext();
  vanillaLodash.mixin(mixins);
  return vanillaLodash;
})();

export default _;
