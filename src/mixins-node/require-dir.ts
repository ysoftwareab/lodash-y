import _ from 'lodash';

/**
 * Part of `lodash-firecloud`.
 *
 * Require all Node.js modules in a directory.
 *
 * @param {string} dir The directory.
 * @param {string[]|RegExp|Function} filter The allowed extensions for 'require' or a filtering function.
 * @returns {Array} Returns an array of required modules.
 */
export let requireDir = function(dir, filter = [
  '.js',
  '.json',
  '.node'
]) {
  if (_.isArray(filter)) {
    let requireExtensions = filter;
    filter = function(filename) {
      return _.includes(requireExtensions, path.extname(filename));
    };
  } else if (_.isRegExp(filter)) {
    // let re = filter;
    let re = /** @type {RegExp} */ (filter);
    filter = function(filename) {
      return re.test(filename);
    };
  } else if (_.isFunction(filter)) {
    // noop
  } else {
    throw new Error(`Unknown type for filter '${typeof filter}.'`);
  }

  // eval('require') is a trick for webpack to ignore bundling the module
  // eslint-disable-next-line no-eval
  let req = eval('require');

  let fs = req('fs');
  let path = req('path');

  let files = fs.readdirSync(dir);

  files = _.filter(files, filter);

  files = _.sortBy(files);

  files = _.map(files, function(file) {
    return path.join(dir, file);
  });

  let modules = _.map(files, function(file) {
    let getProps = req(file);
    return getProps;
  });

  return modules;
};
