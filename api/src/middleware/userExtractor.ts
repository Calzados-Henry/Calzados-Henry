
import { NextFunction, Request, Response } from 'express';
import { TypeUser } from '../enum';
const jwt = require('jsonwebtoken')

export const userExtractorAdmin = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.get('authorization'))
  // console.log(req)
  // tipo de usuario almacenado en el enum
  var { Administrator } = TypeUser
  // se extrae el token desde header
  const authorization = req.get('authorization')
  if (!authorization) {
    return res.status(404).json({ error: "Token no encontrado" })
  }
  // si hay token se guarda en token
  let token = null;
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  console.log('este es el token ',token)
  // decodifica el token para tener la informacion del usuario
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
  console.log("este es el decoded token", decodedToken)
  // si no hay token ó el tipo de usuario es distinto a "Administrator" devolvera un error
  if (!token || decodedToken.type_user !== Administrator) {
    return res.status(404).json({ error: "Error: Accesso denegado, token invalido" })
  }
  // si todo esta ok seguira con la funcion.
  return next();
}

export const userExtractorUser = (req: Request, res: Response, next: NextFunction) => {
  // se extrae el token desde header
  const authorization = req.get('Authorization')
  // si hay token se guarda en token
  let token = null;
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  // decodifica el token para tener la informacion del usuario
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
  // si no hay token ó el tipo de usuario es distinto a "Administrator" devolvera un error
  if (!token || !decodedToken.id) {
    return res.status(404).json({ error: "Error: Accesso denegado, token invalido" })
  }
  req.params.id = decodedToken.id
  // si todo esta ok seguira con la funcion.
  return next();
}