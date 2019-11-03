import * as _mixins from './mixins';
import * as _mixinsNode from './mixins-node';
import __ from 'lodash';

/**
 * @typedef {import('lodash').LoDashStatic} LoDashStatic
 * @typedef {typeof _mixins & typeof _mixinsNode} FirecloudNodeLoDashMixins
 * @typedef {LoDashStatic & FirecloudNodeLoDashMixins} FirecloudNodeLoDashStatic
 */

/** @type {FirecloudNodeLoDashMixins} */
export let mixins = {
  ..._mixins,
  ..._mixinsNode
};

/** @type {FirecloudNodeLoDashStatic} */
// @ts-ignore TS2345
// eslint-disable-next-line firecloud/no-underscore-prefix-exported
export let _ = __.runInContext().mixin(mixins);

export default _;
