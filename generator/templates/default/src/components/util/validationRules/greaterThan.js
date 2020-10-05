/**
 * Required if field matches condition.
 *
 * @param field
 * @param condition
 */
const greaterThan = (field) => (value, parentVm) => {
  const otherValue = parentVm[field];

  if (value instanceof Date && otherValue instanceof Date) {
    return value.getTime() > otherValue.getTime();
  }

  return value > otherValue;
};

export default greaterThan;
