'use strict'
// http://localhost:3001/products/search/:product
// se puede buscar lo que sea y el search encontrara los resultados mas 
// acertados con que solo incluya una cierta parte de la palabra o nombre completo del producto
// ej: buscar "san" ya devolveria todos los productos, que 
//empiecen, contengan o terminen con la palabra "san", como sandalias, sandalia1, sandalia2 etc.

import { Router, Request, Response } from 'express';
import { getProducts } from '../controllers/SearchBar'

const search = Router();

search.get('/:product', async (req: Request, res: Response) => {
    try {
        var orders = await getProducts(req.params.product);
        res.json(orders)
    } catch (e: any) {
        res.json({ error: e.message })
    }
})

export default search;