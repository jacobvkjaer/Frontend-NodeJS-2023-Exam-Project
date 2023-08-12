export const truncate = function (str, length) {
  if (str.length <= length) {
    return str;
  }
  return str.substring(0, length);
};

export const truncateWithTrails = function (str, length) {
  if (str.length <= length) {
    return str;
  }
  return str.substring(0, length) + '...';
};
