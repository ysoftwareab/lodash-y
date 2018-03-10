export let sleep = function(ms = 0) {
  return new Promise(function(resolve, _reject) {
    setTimeout(resolve, ms);
  });
};

export default sleep;
