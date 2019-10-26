import __ from 'lodash';
import _mixins from './mixins';
import _mixinsBrowser from './mixins-browser';
import _mixinsNode from './mixins-node';

/**
 * @typedef {import('lodash').LoDashStatic} LoDashStatic
 * @typedef {typeof _mixins & typeof _mixinsBrowser & typeof _mixinsNode} FirecloudLoDashMixins
 * @typedef {LoDashStatic & FirecloudLoDashMixins} FirecloudLoDashStatic
 */

/** @type {FirecloudLoDashMixins} */
export let mixins = {
  ..._mixins,
  ..._mixinsBrowser,
  ..._mixinsNode
};

/** @type {FirecloudLoDashStatic} */
// @ts-ignore TS2345
// eslint-disable-next-line firecloud/no-underscore-prefix-exported
export let _ = __.runInContext().mixin(mixins);

export default _;
