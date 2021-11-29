import * as _mixins from './mixins';
import * as _mixinsBrowser from './mixins-browser';
import __ from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type YBrowserLoDashStatic = __.LoDashStatic & typeof _mixins & typeof _mixinsBrowser;


export let mixins = {
  ..._mixins,
  ..._mixinsBrowser
};

// eslint-disable-next-line y/no-underscore-prefix-exported
export let _ = __.runInContext().mixin(mixins as any) as YBrowserLoDashStatic;

export default _;
