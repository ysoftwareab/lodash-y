import * as _mixins from './mixins';
import * as _mixinsNode from './mixins-node';
import __ from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type YNodeLoDashStatic = __.LoDashStatic & typeof _mixins & typeof _mixinsNode;


export let mixins = {
  ..._mixins,
  ..._mixinsNode
};

// eslint-disable-next-line y/no-underscore-prefix-exported
export let _ = __.runInContext().mixin(mixins as any) as YNodeLoDashStatic;

export default _;
