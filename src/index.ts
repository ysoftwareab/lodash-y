import * as _mixins from './mixins';
import __ from 'lodash';

declare module 'lodash' {
  interface LoDashStatic {
    defer(
      // func: (...args: any[]) => any,
      func: Parameters<typeof setTimeout>[0],
      ...args: any[]
    ): number;
  }
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type FirecloudLoDashStatic = __.LoDashStatic & typeof _mixins;

export let mixins = {
  ..._mixins
};

// eslint-disable-next-line firecloud/no-underscore-prefix-exported
export let _ = __.runInContext().mixin(mixins as any) as FirecloudLoDashStatic;

export default _;
