export function convertArrayToObject(array, key) {
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, {});
}
