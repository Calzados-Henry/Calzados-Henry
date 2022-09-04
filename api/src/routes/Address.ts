'use strict'
//require
import express from 'express'
import * as addressServices from '../controllers/Address';
import e, { Router, Request, Response } from "express";

import { AddressI } from '../types';
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

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const id = +req.params.id
    const address = await addressServices.findById(id)
    /* const address: AddressI = await addressServices.getAddress(req.params.id) as AddressI */
    if (address) {
      res.json(address)
    }
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      res.status(400).json({ error: error.message })
    }

  }
})

router.post('/', async (req, res) => {
  try {
    const newAddress = addressServices.toNewAddress(req.body)
    const postedAddress = await addressServices.postAddress(newAddress)
    if (postedAddress)
      res.json(postedAddress)
    
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      res.status(400).json({ error: error.message })
    }
  }
})
/* const Address = Router()

Address.get('/:id', async (req: Request, res: Response) => {
  try {
    let addresses = await getAddress(req.params.id)
    if (addresses) {
      res.json(addresses)
    }
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
})

Address.post('/:id', async (req: Request, res: Response) => {
  try {
    const postedAddress = await postAddress(req.params.id, req.body)
    if (postedAddress) {
      res.json(postedAddress)
    }
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
})

Address.patch('/', async (req: Request, res: Response) => {
  try {
    const patchedAddress = await patchAddress(req.body)
    if (patchedAddress) {
      res.json(patchedAddress)
    }
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
})
Address.delete('/', async (req: Request, res: Response) => {
  try {
    const deletedAddress = await deleteAddress(req.body)
    if (deletedAddress) {
      res.json(deletedAddress)
    }
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}) */

export default Address