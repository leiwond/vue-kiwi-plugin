import DateConverter from '../DateConverter';

/**
 * formats a date object into a readable string
 * @param d date
 * @param yearCanBeUnknown true if only day and month should be returned (e.g. for birthdays)
 * @param verbalize true to return written words instead of date (e.g. "heute", "gestern", ...)
 * @param placeholder for empty dates
 * @returns string
 */
const date = function (d, yearCanBeUnknown = false, verbalize = false, placeholder = 'Unbekannt') {
  return DateConverter.convertDate(d, yearCanBeUnknown, verbalize, placeholder);
};

export default date;
