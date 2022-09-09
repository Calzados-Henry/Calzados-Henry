import { ProductI } from '../features/product/product.model';

const productsArray: ProductI[] = [];

export const setLocalStorage = (product: ProductI): void => {
  productsArray.push(product);
  if (productsArray.length) localStorage.setItem('product', JSON.stringify(productsArray));
  else throw new Error('There are any products in the cart');
};

export const getLocalStorage = (): ProductI[] => {
  const getProducts = localStorage.getItem('product');
  if (!getProducts) throw new Error('There are any products in the cart');
  else {
    const products: ProductI[] = JSON.parse(getProducts);
    return products;
  }
};

export const removeOneFromLS = (id: number): void => {
  const getProducts = localStorage.getItem('product');
  if (!getProducts) throw new Error('There are any products in the cart');
  else {
    const filtered: ProductI[] = JSON.parse(getProducts).filter(
      (product: { id: number }) => product.id !== id,
    );
    if (!filtered.length) localStorage.clear();
    localStorage.removeItem('product');
    localStorage.setItem('product', JSON.stringify(filtered));
  }
};

export const clearLocalStorage = (): void => {
  localStorage.clear();
};

export const stripePublicKey =
  'pk_test_51LfWiPB2d7giWWONJCFwX9HwqQchBoOQ5hYeVl88SUOZPxiLRUbs767EYlkywbQsEBPVRGu1URKmMn93JWltTjzQ005JqlzeEy';
