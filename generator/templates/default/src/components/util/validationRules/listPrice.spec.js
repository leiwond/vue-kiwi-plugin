import listPrice from './listPrice';

// TODO
// import Product from 'models/Product';
// import { ProductGroups } from 'models/ProductGroup';
//
// describe('listPrice valid', () => {
//   test('it should be valid when = 0', () => {
//     expect(listPrice(0, {})).toBe(true);
//   });
//
//   test('it should be valid when > 0', () => {
//     expect(listPrice(10, {})).toBe(true);
//   });
//
//   test(
//     'it should be valid when the product of the position item is a growth'
//             + 'discount product (even if the list '
//             + 'price would otherwise be invalid)',
//     () => {
//       const product = new Product();
//       product.relationships = { productGroup: { data: { id: ProductGroups.GROWTH_DISCOUNT } } };
//       expect(listPrice(-100, { product })).toBe(true);
//     },
//   );
// });
//
// describe('listPrice invalid', () => {
//   test('it should be invalid when < 0', () => {
//     expect(listPrice(-1, {})).toBe(false);
//   });
//
//   test('it should be invalid when invalid value and product is other than growth discount',
//        () => {
//     const product = new Product();
//     product.relationships = { productGroup: {
//        data: { id: ProductGroups.SPECIAL_OFFER_MANUAL_JOB_AD_ENTRY } } };
//     expect(listPrice(-100, { product })).toBe(false);
//   });
// });
