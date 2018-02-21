import __ from 'lodash';
import abstract from './abstract';
import base64 from './base64';
import consoleLogTime from './console-log-time';
import deeply from './deeply';
import onceIn from './once-in';
import promisify from './promisify';
import unbase64 from './unbase64';

export let mixins = {
  abstract,
  base64,
  consoleLogTime,
  deeply,
  onceIn,
  promisify,
  unbase64
};

export let _ = __.runInContext();
_.mixin(mixins);

export default _;
