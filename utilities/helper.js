function exclude(obj, keys) {
    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = undefined
    }
    return obj
}

function contain(arr, keys) {
  for (let i = 0; i < keys.length; i++) {
    const element = keys[i];
    if (arr.includes(element)) return true;
  }
  return false;
}
module.exports.contain = contain;
module.exports.exclude = exclude;
