'use strict'


import { Address, Users } from '../db'

//PATCH/address: enviar un objeto que contenga todos los datos de la direccion a editar
//junto con una propiedad llamada update: "la direccion". Ej: //! consultar si es conveniente pedir solo la direccion o un objeto con la direccion y el zip_code 
// 
// {...address,
// update:'Springfield 343'
//}

export const getAddress = async (id: string): Promise<object> => {
    const userAddresses: any = await Users.findByPk(id, { include: { model: Address } })
    if (!userAddresses.addresses.length && userAddresses) {
        throw new Error("there's no any saved address for the user id:" + id)
    } else if (!userAddresses) {
        throw new Error('the user with id:' + id + "doesn't exists")
    } else {
        return (userAddresses.addresses)
    }
}

export const postAddress = async (id: string, body: any): Promise<object> => {
    const { address, zip_code }: any = body
    const [newAddress, created]: any = await Address.findOrCreate({
        where: {
            address: address,
            zip_code: zip_code
        }
    })
    const user: any = await Users.findByPk(id)
    if (user && created) {
        await user.addAddress(newAddress)
        const userAddresses = await Users.findByPk(id, { include: { model: Address } })
        if (userAddresses) {
            return userAddresses
        }
    } else if (!created) {
        throw new Error('the address' + newAddress.address + "already exists");
    } else if (!user) {
        throw new Error(`we couldn't find the user with id: ` + id)
    }
    throw new Error('An error has ocurred')
}

export const patchAddress = async (value: any): Promise<object> => {
    const address: any = await Address.findByPk(value.id)
    if (address.address == value.update) {
        throw new Error(`please type another address`)
    } else {
        address.address = value.update
        await address.save()
    }
    return address
}

export const deleteAddress = async (value: any): Promise<object> => {
    const deletedAddress: any = await Address.findByPk(value.id)
    if (deletedAddress.isActive == false) {
        throw new Error(`${value.address} ya está 'eliminada'`)
    } else {
        deletedAddress.isActive = false
        await deletedAddress.save()
    }
    return deletedAddress
}