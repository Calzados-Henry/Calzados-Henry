'use strict'
// se requiere el models
import { sequelize } from '../database'
import Users from '../typescriptmodels/users.model'
import { UsersI } from '../typescriptmodels/users.model'





module.exports = {
  getUsers: async (): Promise<UsersI | object> => {
    // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
    console.log("Entrando al GET")
    const users: UsersI[] = await Users.findAll()
    /* console.log(users)
    console.log(typeof users) */
    return users.length > 0 ? users : { message: "No hay usuarios" };
  },

  createUsers: async (value: any): Promise<object> => {
    // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar nuevo usuario.
    var username = await Users.findAll({ where: { username: value.username } })
    var email = await sequelize.models.Users.findAll({ where: { email: value.email } })
    var identification = await sequelize.models.Users.findAll({ where: { identification: value.identification } })
    // un objeto que almacena los mensajes de error
    interface error {
      username?: string,
      email?: string,
      identification?: string
    }
    // Agrega mensaje al objeto dependiendo de lo que falte.
    if (username.length > 0 || email.length > 0 || identification.length > 0) {
      let error: error = {};
      if (username.length > 0) {
        error.username = "El username ya existe"
      }
      if (email.length > 0) {
        error.email = "El email ya existe"
      }
      if (identification.length > 0) {
        error.identification = "La identificacion ya existe"
      }
      return error;
    }
    // si todo esta correcto crea nuevo usuario.
    return await sequelize.models.Users.create(value)
  },

  updateUser: async (value: any): Promise<object> => {
    // Se busca el usuario por id
    var userByID = await sequelize.models.Users.findByPk(value.id)
    if (userByID !== null) {
      userByID.set(value);
      await userByID.save();
      return userByID
    }
    return { message: `No se encontro el usuario con ID ${value.id}` };
  },

  /* deleteUser: async (id: number): Promise<object> => {
    // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
    var userByID = await sequelize.models.Users.findByPk(id)
    if (userByID !== null) {
      if (userByID.isActive) {
        userByID.isActive = false;
        await userByID.save();
        return userByID
      }
      return { message: `El usuario con ID ${id} ya se encuentra Eliminado` };
    }
    return { message: `No se encontro el usuario con ID ${id}` };
  } */
}