import __ from 'lodash';
import abstract from './abstract';
import alwaysPromise from './always-promise';
import base64 from './base64';
import consoleLogTime from './console-log-time';
import mapValuesDeep from './map-values-deep';
import naiveChecksum from './naive-checksum';
import onceIn from './once-in';
import outdent from 'outdent';
import promisify from './promisify';
import sleep from './sleep';
import unbase64 from './unbase64';

export let mixins = {
  abstract,
  alwaysPromise,
  base64,
  consoleLogTime,
  mapValuesDeep,
  naiveChecksum,
  onceIn,
  outdent,
  promisify,
  sleep,
  unbase64
};

// eslint-disable-next-line firecloud/no-underscore-prefix-exported
export let _ = (function() {
  let vanillaLodash = __.runInContext();
  vanillaLodash.mixin(mixins);
  return vanillaLodash;
})();

export default _;
