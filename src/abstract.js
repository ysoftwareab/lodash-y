export let abstract = function(name = 'it') {
  return function() {
    throw new Error(`Calling an abstract function. Please implement ${name}.`);
  };
};

export default abstract;
