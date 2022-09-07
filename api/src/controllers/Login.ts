'use strict'

import { Users } from "../db";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

export const login = async (value: any): Promise<object> => {
  if (value.email && value.password) {
    var user: any = await Users.findOne({ where: { email: value.email } });
    user = JSON.parse(JSON.stringify(user, null, 2))
    const passwordCorrect = user === null ? false : await bcrypt.compareSync(value.password, user.password)
    if (!passwordCorrect) {
      return { message: "Usuario ó contraseña invalido" };
    }
    user = { ...user, token: jwt.sign(user, process.env.SECRET_TOKEN, { expiresIn: 60 * 60 * 24 }) } // token valido x 24 horas
    return user;
  } else {
    return { message: "Falta ingresar Usuario ó Contraseña" }
  }
}