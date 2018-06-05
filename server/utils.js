const R = require("ramda");
module.exports = {
  exists(value) {
    return value === undefined ? false : value === null ? false : true;
  },
  splitName(name) {
    return R.split(".", name).map(R.trim);
  }
}