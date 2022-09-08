import { Category } from '../db';


export const getCategories = async () => {
  const categories: any = await Category.findAll({ where: { isActive: true } })
  if (categories.length > 0) {
    return categories
  } else {
    throw new Error('No existen categorías')
  }
}

export const postCategory = async (category: any): Promise<object> => {
  const categories: any = await Category.findOrCreate({
    where: {
      category: category,
    }
  })
  if (categories.isActive === true) {
    return categories
  } else {
    return categories
  }
}

export const patchCategory = async (value: any): Promise<object> => {
  const findedCategory: any = await Category.findByPk(value.id)
  if (findedCategory.category == value.update) {
    throw new Error(`La categoria ya está definida como ${value.update}`)
  } else {
    findedCategory.category = value.update
    await findedCategory.save()
  }
  return findedCategory
}

export const deleteCategory = async (value: any): Promise<object> => {
  const deletedCategory: any = await Category.findByPk(value.id)
  if (deletedCategory.isActive == false) {
    throw new Error(`La categoría ${value.category} ya está 'eliminada'`)
  } else {
    deletedCategory.isActive = false
    await deletedCategory.save()
  }
  return deletedCategory
}

