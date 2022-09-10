import { Users, Products } from "../db";


export const getCartArr = async (email: any): Promise<any> => {

    const userID = await Users.findOne(
        {
            where: { email: email },
            include: ['cart']
        }
    )
    if (userID) {
        const cartObjects: Array<any> = await userID.getDataValue('cart')
        if (cartObjects.length) {
            const arrayDeProds: Array<any> = cartObjects.map(async (prod_D) => {
                const product_del_productD: any = await Products.findOne({ where: { id: prod_D.id_product } })
                if (product_del_productD) {
                    const product_pd: object = {
                        id_product_details: prod_D.id,
                        price: product_del_productD.sell_price,
                        quantity: prod_D.quantity
                    }
                    return product_pd
                } else {
                    return {}
                }
            })
            if (arrayDeProds.length) {
                return arrayDeProds
            } else {
                throw new Error('Revisar arrayDeProds')
            }
        }
    }
}

export const getCartAmount = async (email: any): Promise<any> => {
    const cartArray: Array<any> = await getCartArr(email)
    let ammount: number = 0
    cartArray.forEach(product => ammount += product.price * product.quantity)
    if (ammount > 0) {
        return ammount
    }
}


// let monto:number = 0
//                 arrayDeProds.forEach(p=>monto+= p.price*p.quantity)