import { Users, Product_details } from "../db";


export const getUserFavourites = async (id_user: string): Promise<any> => {
    const userExiste: any = await Users.findByPk(id_user)
    if (userExiste) {
        const favourites = await userExiste.getFavourites()
        if (favourites) {
            return favourites
        } else {
            throw new Error(`No existen favoritos para el usuario ${id_user}`)
        }
    } else {
        throw new Error('No existe el usuario con el id: ' + id_user)
    }
}

export const addFavourite = async (id_user: string, id_product: number): Promise<any> => {
    const userExiste: any = await Users.findByPk(id_user)
    if (userExiste) {
        const productExiste = await Product_details.findByPk(id_product)
        if (productExiste) {
            await userExiste.addFavourite(productExiste)
            return userExiste
        } else {
            throw new Error(`No existe el producto de id ${id_user}`)
        }
    } else {
        throw new Error('No existe el usuario con el id: ' + id_user)
    }
}
export const deleteFavourite = async (id_user: string, id_product: number): Promise<any> => {
    const userExiste: any = await Users.findByPk(id_user)
    if (userExiste) {
        const productExiste = await Product_details.findByPk(id_product)
        if (productExiste) {
            const favourites = await userExiste.getFavourites()
            if(favourites){
                const favouritesFiltered = await favourites.filter((p:any)=>p.id != id_product)
                return favouritesFiltered
            }
        } else {
            throw new Error(`No existe el producto de id ${id_user}`)
        }
    } else {
        throw new Error('No existe el usuario con el id: ' + id_user)
    }
}
