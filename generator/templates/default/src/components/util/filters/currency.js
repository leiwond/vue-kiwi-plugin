const currency = function (num) {
  let tmp;
  const val = parseFloat(num);
  if (Number.isNaN(val)) {
    tmp = '0,00';
  } else {
    tmp = val.toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1§')
      .replace(/\./g, ',')
      .replace(/§/g, '.');
  }

  return `€ ${tmp}`;
};

export default currency;
