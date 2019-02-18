import __ from 'lodash';
import _mixins from './mixins';

export let mixins = __.mapValues(_mixins, function(file) {
  // eslint-disable-next-line global-require
  return require(file).default;
});

// eslint-disable-next-line firecloud/no-underscore-prefix-exported
export let _ = (function() {
  let vanillaLodash = __.runInContext();
  vanillaLodash.mixin(mixins);
  return vanillaLodash;
})();

export default _;
