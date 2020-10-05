const parseDate = function (date) {
  if (typeof date === 'string') {
    return new Date(date);
  }

  return date;
};

const isToday = function (date) {
  const parsedDate = parseDate(date);

  const today = new Date();
  return today.toDateString() === parsedDate.toDateString();
};

const isYesterday = function (date) {
  const parsedDate = parseDate(date);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toDateString() === parsedDate.toDateString();
};

const isTomorrow = function (date) {
  const parsedDate = parseDate(date);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() + 1);
  return yesterday.toDateString() === parsedDate.toDateString();
};

const isInPast = function (date) {
  const parsedDate = parseDate(date);

  const now = new Date();
  return parsedDate < now;
};

const dateToWord = function (date) {
  const parsedDate = parseDate(date);

  if (isToday(parsedDate)) {
    return 'heute';
  }
  if (isYesterday(parsedDate)) {
    return 'gestern';
  }
  if (isTomorrow(parsedDate)) {
    return 'morgen';
  }
  if (isInPast(parsedDate)) {
    return 'früher';
  }
  return 'später';
};

class DateConverter {
  /**
     * formats a date object into a readable string
     * @param d date
     * @param yearCanBeUnknown true if only day and month should be returned (e.g. for birthdays)
     * @param verbalize true to return written words instead of date (e.g. "heute", "gestern", ...)
     * @param placeholder for empty dates
     * @returns string
     */
  static convertDate(d, yearCanBeUnknown = false, verbalize = false, placeholder = 'Unbekannt') {
    if (!d) {
      return '';
    }

    if (Date.parse(d) === 0) {
      return placeholder;
    }

    if (verbalize && !yearCanBeUnknown) {
      return dateToWord(d);
    }

    let formattedDate = `${(`0${d.getDate()}`).slice(-2)}.${(`0${d.getMonth() + 1}`).slice(-2)}.`;

    // since dates with unknown years are set to 1910 check this, and if so do not show the year
    if (!(yearCanBeUnknown && d.getFullYear() === 1910)) {
      formattedDate += d.getFullYear();
    }

    return formattedDate;
  }

  // Expected time format is hh:mm
  static convertTimeString(time) {
    const pattern = time.match(/^([0-9]{2}):([0-9]{2})$/);

    if (pattern) {
      const hours = parseInt(pattern[1], 10);
      const minutes = parseInt(pattern[2], 10);

      return {
        hours,
        minutes,
      };
    }

    return null;
  }
}

export default new DateConverter();
