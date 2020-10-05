const numberFormat = function (num) {
  return num.toString().replace(/\./, ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export default numberFormat;
