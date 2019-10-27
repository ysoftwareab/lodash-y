import __ from 'lodash';
import _mixins from './mixins';

/**
 * @typedef {import('lodash').LoDashStatic} LoDashStatic
 * @typedef {typeof _mixins} FirecloudLoDashMixins
 * @typedef {LoDashStatic & FirecloudLoDashMixins} FirecloudLoDashStatic
 */

/** @type {FirecloudLoDashMixins} */
export let mixins = {
  ..._mixins
};

/** @type {FirecloudLoDashStatic} */
// @ts-ignore TS2345
// eslint-disable-next-line firecloud/no-underscore-prefix-exported
export let _ = __.runInContext().mixin(mixins);

export default _;
