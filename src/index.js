import __ from 'lodash';
import abstract from './abstract';
import deeply from './deeply';

export let mixins = {
  abstract,
  deeply
};

export let _ = __.runInContext();
_.mixin(mixins);

export default _;
