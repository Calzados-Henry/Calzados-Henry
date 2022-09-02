
const DbModels = require('../../db.ts')


module.exports = {
    getCategories:async()=>{
        const categories:string = await DbModels.Category.findAll({where:{isActive:true}})
        if(categories){
            return categories
        }else{
            throw new Error('No existen categorías')
        }
    },
    postCategory: async(category:any):Promise<object>=>{
        const categories = await DbModels.Category.findOrCreate({
            where:{
                category:category,
            }
        })
        if(categories.isActive===true){
            return categories
        }else{
            return categories
        }
    },
    patchCategory: async(value:any):Promise<object>=>{
        const findedCategory = await DbModels.Category.findByPk(value.id)
        if(findedCategory.category==value.update){
            throw new Error (`La categoria ya está definida como ${value.update}`)
        }else{
            findedCategory.category = value.update
            await findedCategory.save()
        }
        return findedCategory
    },
    deleteCategory: async(value:any):Promise<object>=>{
        const deletedCategory = await DbModels.Category.findByPk(value.id)
        if(deletedCategory.isActive==false){
            throw new Error (`La categoría ${value.category} ya está 'eliminada'`)
        }else{
            deletedCategory.isActive = false
            await deletedCategory.save()
        }
        return deletedCategory
    }

};
