'use strict'

import { Users } from "../db";

const bcrypt = require('bcrypt');

export const login = async (value: any): Promise<object> => {
  console.log(value)
  if (value.email && value.password) {
    var user: any = await Users.findOne({ where: { email: value.email } });
    const passwordCorrect = user === null ? false : await bcrypt.compareSync(value.password, user.password)
    if (!passwordCorrect) {
      return { messaje: "Usuario ó contraseña invalido" };
    }
    return user;
  } else {
    return { messaje: "Falta ingresar Usuario ó Contraseña" }
  }
}