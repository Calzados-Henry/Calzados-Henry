
import { Address, Users } from '../db'
import { NewAddresEntry } from '../types'

//PATCH/address: enviar un objeto que contenga todos los datos de la direccion a editar
//junto con una propiedad llamada update: "la direccion". Ej: //! consultar si es conveniente pedir solo la direccion o un objeto con la direccion y el zip_code 
// 
// {...address,
// update:'Springfield 343'
//}

export const getAddress = async (id: string): Promise<object> => {
    const userAddresses: any = await Users.findByPk(id, { include: { model: Address } })
    if (!userAddresses.addresses.length && userAddresses) {
        throw new Error('No existen Direcciones guardadas para el usuario ' + id)
    } else if (!userAddresses) {
        throw new Error('No existe usuario con id:' + id)
    } else {
        return (userAddresses.addresses)
    }
}

export const toNewAddress = (object:any): NewAddresEntry => {
    const newEntry: NewAddresEntry = {
        address: parseAddress(object.address),
        zip_code: parseZip_Code(object.zip_code),
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
        throw new Error('ya existe la dirección ' + newAddress.address);
    } else if (!user) {
        throw new Error('No se encontró al usuario: ' + id)
    }
    throw new Error('Ocurrió algún error')
}

export const patchAddress = async (value: any): Promise<object> => {
    const address: any = await Address.findByPk(value.id)
    if (address.address == value.update) {
        throw new Error(`Por favor seleccione una dirección distinta`)
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
