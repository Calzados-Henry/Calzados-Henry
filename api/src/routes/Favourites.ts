'use strict'
//require
import { addFavourite , getUserFavourites , deleteFavourite } from '../controllers/Favourites';
import { Router, Request, Response } from "express";
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


const Favourites = Router()

Favourites.get('/:id', async (req: Request, res: Response) => {
    try {
        let favourites = await getUserFavourites(req.params.id)
        if (favourites) {
            res.json(favourites)
        }
    } catch (e: any) {
        res.status(400).json({ error: e.message })
    }
})

Favourites.post('/:id', async (req: Request, res: Response) => {
    try {
        let favourites = await addFavourite(req.params.id, req.body.id)
        if (favourites) {
            res.json(favourites)
        }
    } catch (e: any) {
        res.status(400).json({ error: e.message })
    }
})

Favourites.delete('/:id', async (req: Request, res: Response) => {
    try {
        let favouriteDeleted = await deleteFavourite(req.params.id, req.body.id)
        if (favouriteDeleted) {
            res.json(favouriteDeleted)
        }
    } catch (e: any) {
        res.status(400).json({ error: e.message })
    }
})

// Address.delete('/', async (req: Request, res: Response) => {
//     try {
//         const deletedAddress = await deleteAddress(req.body)
//         if (deletedAddress) {
//             res.json(deletedAddress)
//         }
//     } catch (e: any) {
//         res.status(400).json({ error: e.message })
//     }
// })

export default Favourites