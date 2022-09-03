'use strict'
//require
import { postAddress, getAddress, patchAddress, deleteAddress } from '../controllers/Address'
// const { postAddress, getAddress, patchAddress, deleteAddress } = require('../controllers/Address')
import { Router, Request, Response } from "express"
// const { getCategories } = Categories

//Breve Documentacion:
// Ruta GET/addresses:id --> trae todos los direcciones

// Ruta POST/address/:id--> se envia por body la nueva categoría como un "string".

// Ruta PATCH/ --> se envia por body un objeto cuya primera key 
// debe llamarse ser el 'id' 
// y la segunda key debe llamarse 'update' y el value tiene que ser el valor actualizado.
// ej: 
// {
//     id:"1",
//     update:"zapatos"
// }
//Ruta DELETE/category --> se envia por body un objeto con id de la categoria a eliminar ("logicamente")
//y la categoria, Ejemplo: 
// {
//     id:1,
//     category:'zapatos'
// }


const Address = Router()

Address.get('/:id', async (req:Request , res:Response)=>{
    try {
        let addresses = await getAddress(req.params.id)
        if(addresses){
            res.json(addresses)
        }
    } catch (e:any) {
        res.status(400).json({error:e.message})
    }
})

Address.post('/:id', async (req: Request, res: Response)=>{
    try {
        const postedAddress=await postAddress(req.params.id, req.body)
        if(postedAddress){
            res.json(postedAddress)
        }
    } catch (e:any) {
        res.status(400).json({error:e.message})
    }
})

Address.patch('/', async (req: Request, res: Response)=>{
    try {
        const patchedAddress=await patchAddress(req.body)
        if(patchedAddress){
            res.json(patchedAddress)
        }
    } catch (e:any) {
        res.status(400).json({error:e.message})
    }
})
Address.delete('/', async (req: Request, res: Response)=>{
    try {
        const deletedAddress=await deleteAddress(req.body)
        if(deletedAddress){
            res.json(deletedAddress)
        }
    } catch (e:any) {
        res.status(400).json({error:e.message})
    }
})

export default Address