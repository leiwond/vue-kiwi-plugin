/**
 * Valid if list price >= 0 or product of position item is growth discount product.
 *
 * @param price
 * @param positionItem
 * @returns {boolean|boolean}
 */
const listPrice = (price, positionItem)
=> price >= 0 || !!(positionItem.product && positionItem.product.isGrowthDiscountProduct());

export default listPrice;
