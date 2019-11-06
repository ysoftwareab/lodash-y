import _ from 'lodash';

/**
 * Part of `lodash-firecloud`.
 *
 * Require all Node.js modules in a directory.
 *
 * @param dir The directory.
 * @param filter The allowed extensions for 'require' or a filtering function.
 * @returns Returns an array of required modules.
 */
export let requireDir = function(dir: string, filter: string[]|RegExp|Function = [
  '.js',
  '.json',
  '.node'
]): unknown[] {
  if (_.isArray(filter)) {
    let requireExtensions = filter;
    filter = function(filename): boolean {
      return _.includes(requireExtensions, path.extname(filename));
    };
  } else if (_.isRegExp(filter)) {
    let re = filter;
    filter = function(filename): boolean {
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

  files = _.map(files, function(file): string {
    return path.join(dir, file);
  });

  let modules = _.map(files, function(file): unknown {
    let getProps = req(file);
    return getProps;
  });

  return modules;
};
