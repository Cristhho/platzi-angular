import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    service = new CartService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for get cartProducts', () => {
    it('should return an empty array', () => {
      const prods = service.cartProducts;
      expect(Array.isArray(prods)).toBeTruthy();
      expect(prods).toHaveSize(0);
    });
  });
});
