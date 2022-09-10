import { Category } from '../db';


export const getCategories = async () => {
  const categories: any = await Category.findAll({ where: { isActive: true } })
  if (categories.length > 0) {
    return categories
  } else {
    throw new Error(`there's not any category`)
  }
}

export const postCategory = async (value: any): Promise<object> => {
  // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.
  if (Object.prototype.toString.call(value) === '[object Array]') {
    if (value[0].hasOwnProperty('category')) {
      try {
        return await Category.bulkCreate(value)
      } catch (error) {
        return { message: "Please try not to type info that already exists. Verify" }
      }
    } else {
      return { message: "Please, verify the object key, e. g: [{'category':'category'}] || {'category':'category'}" }
    }
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    if (value.hasOwnProperty('category')) {
      try {
        return await Category.create(value)
      } catch (error) {
        return { message: "Please try not to type info that already exists. Verify" }
      }
    } else {
      return { message: "Please, verify the object key, e. g: [{'category':'category'}] || {'category':'category'}" }
    }
  }
  return { message: "Verify data." }
}

export const patchCategory = async (value: any): Promise<object> => {
  const findedCategory: any = await Category.findByPk(value.id)
  if (findedCategory.category == value.update) {
    throw new Error(`The category is already named as ${value.update}`)
  } else {
    findedCategory.category = value.update
    await findedCategory.save()
  }
  return findedCategory
}

export const deleteCategory = async (value: any): Promise<object> => {
  const deletedCategory: any = await Category.findByPk(value.id)
  if (deletedCategory.isActive == false) {
    throw new Error(`The category ${value.category} is already 'deleted'`)
  } else {
    deletedCategory.isActive = false
    await deletedCategory.save()
  }
  return deletedCategory
}

