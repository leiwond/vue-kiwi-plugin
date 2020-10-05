import absoluteDiscount from './absoluteDiscount';
// TODO
// import Product from '../../../models/Product';
// import { ProductGroups } from 'models/ProductGroup';

// describe('Absolute discount valid', () => {
//   test('it should be valid when >= 0 and < listPrice', () => {
//     expect(absoluteDiscount(100, { listPrice: 500 })).toBe(true);
//   });
//
//   test(
//     'it should be valid when the product of the position item is a growth discount product '
//             + '(even if the discount '
//             + 'would otherwise be valid)',
//     () => {
//       const product = new Product();
//       product.relationships = { productGroup: { data: { id: ProductGroups.GROWTH_DISCOUNT } } };
//       const positionItem = { product, listPrice: 500 };
//
//       expect(absoluteDiscount(600, positionItem)).toBe(true);
//     },
//   );
// });
//
// describe('Absolute discount invalid', () => {
//   test('it should be invalid when < 0', () => {
//     expect(absoluteDiscount(-1, { listPrice: 500 })).toBe(false);
//   });
//
//   test('it should be invalid when > listPrice', () => {
//     expect(absoluteDiscount(600, { listPrice: 500 })).toBe(false);
//   });
//
//   test('it should be invalid when invalid value and product is other than growth discount',
//   () => {
//     const product = new Product();
//     product.relationships = { productGroup: { data: {
//     id: ProductGroups.CONTINGENT_MANUAL_ENTRY } } };
//     const positionItem = { product, listPrice: 500 };
//
//     expect(absoluteDiscount(600, positionItem)).toBe(false);
//   });
// });
