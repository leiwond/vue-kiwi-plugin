import date from './date';
import time from './time';

const datetime = function (d, yearCanBeUnknown = false) {
  return `${date(d, yearCanBeUnknown)} ${time(d)}`;
};

export default datetime;
