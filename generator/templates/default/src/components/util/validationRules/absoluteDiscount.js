/**
 * Valid if discount >= 0 and < list price or product is growth discount product.
 *
 * @param discount
 * @param positionItem
 * @returns {boolean|boolean}
 */
const absoluteDiscount = (discount, positionItem) => {
  if (positionItem && positionItem.product && positionItem.product.isGrowthDiscountProduct()) {
    return true;
  }

  const parsedDiscount = parseFloat(discount);
  const listPrice = parseFloat(positionItem.listPrice);

  return (parsedDiscount >= 0 && parsedDiscount <= listPrice);
};

export default absoluteDiscount;
