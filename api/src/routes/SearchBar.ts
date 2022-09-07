'use strict'
// se requiere el models
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