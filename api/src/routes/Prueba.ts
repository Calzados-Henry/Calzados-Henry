import { Router } from "express";
const Mockup = require('../utils/mokeo.json')
// ruta: GET/prueba, enviará todo el array de objetos mockeados


const prueba = Router()

prueba.get('/', (_req, res) => {
    res.json(Mockup)
})

prueba.post('/', (_req, res) => {
    res.send('ok')
})

export default prueba