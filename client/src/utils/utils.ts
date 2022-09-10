import { CartI } from "../features/cart/CartSlice"


let productsArray: Partial<CartI>[] = []

export const setProductLocalStorage = (newProduct:Partial<CartI>): void => {
    const getProducts = localStorage.getItem('product')
    if(!getProducts) {
        productsArray.push(newProduct)
        localStorage.setItem('product', JSON.stringify(productsArray))
    } else {
        const localProducts = JSON.parse(getProducts)
        const finded = localProducts.findIndex((p: { id: number | undefined }) => p.id === newProduct.details?.id)
        if(finded >= 0 && productsArray.length) {
            productsArray[finded].quantity = productsArray[finded].quantity ? + 1 : 1;
            localStorage.setItem('product', JSON.stringify(productsArray))
        } else {
            productsArray.push(newProduct)
            localStorage.setItem('product', JSON.stringify(productsArray))
        }
    }
}

export const getProductsLocalStorage = () : CartI[] | null => {
        const getProducts = localStorage.getItem('product')
        if(!getProducts) return null
        else {
            const products: CartI[] = JSON.parse(getProducts)
            return products
        }
}

export const removeOneProductFromLS = (id: number) : void => {
    const getProducts = localStorage.getItem('product')
        if(!getProducts) throw new Error("There are any products in the cart");
        else {
            const filtered: CartI[] = JSON.parse(getProducts).filter((product: { id: number }) => product.id !== id)
            localStorage.removeItem('product')
            localStorage.setItem('product', JSON.stringify(filtered))
        }
}

export const stripePublicKey =
  'pk_test_51LfWiPB2d7giWWONJCFwX9HwqQchBoOQ5hYeVl88SUOZPxiLRUbs767EYlkywbQsEBPVRGu1URKmMn93JWltTjzQ005JqlzeEy';
