export let unbase64 = function(string) {
  let result = Buffer.from(string, 'base64').toString();
  return result;
};
