import { CartI, UserSizeI } from "../features/cart/CartSlice"

export const setProductLocalStorage = (newProduct:Partial<CartI>): void => {
    const getProducts = localStorage.getItem('product')
    let productsArray: Partial<CartI>[] = []
    if(!getProducts) {
        productsArray.push(newProduct)
        localStorage.setItem('product', JSON.stringify(productsArray))
    } else {
        const storageProducts = JSON.parse(getProducts)
        localStorage.removeItem('product')
        localStorage.setItem('product', JSON.stringify([...storageProducts, newProduct]))
    }
}

export const updateLS = (method: string, idSent: number, sizes: UserSizeI): CartI[] => {
    const getProducts = localStorage.getItem('product')
    if(!getProducts) throw new Error("Can't find item, please refresh")
    else {
        const localProducts = JSON.parse(getProducts)
        const finded = localProducts.findIndex((p: { idProduct: number | undefined }) => p.idProduct === idSent)
        if(method === 'increase') {
            localProducts[finded].quantity += 1
        } 
        if(method === 'decrease') {
            if(localProducts[finded].quantity > 1) localProducts[finded].quantity -= 1  
        }
        if(sizes && method === 'changeSize') {
            localProducts[finded].sizeCart = sizes
        }
        if(sizes && method === 'modify') {
            localProducts[finded].quantity = sizes.stock
        }
        localStorage.removeItem('product')
        localStorage.setItem('product', JSON.stringify(localProducts))
        return localProducts
    }
}

export const removeOneProductFromLS = (id: number): CartI[] => {
    const getProducts = localStorage.getItem('product')
        if(!getProducts) throw new Error("There are any products in the cart");
        else {
            const filtered: CartI[] = JSON.parse(getProducts).filter((product: { idProduct: number }) => product.idProduct !== id)
            if(!filtered.length) localStorage.removeItem('product')
            else {
                localStorage.removeItem('product')
                localStorage.setItem('product', JSON.stringify(filtered))
            }
            return filtered
        }
}

export const stripePublicKey =
  'pk_test_51LfWiPB2d7giWWONJCFwX9HwqQchBoOQ5hYeVl88SUOZPxiLRUbs767EYlkywbQsEBPVRGu1URKmMn93JWltTjzQ005JqlzeEy';

