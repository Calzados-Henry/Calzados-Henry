import { Reviews, Users } from "../db"
import { ProductsI, ReviewsPostI, UsersI } from "../types"

export const getReviewsProduct = async (productId: ProductsI["id"]) => {
  try {
    const findReviews = await Reviews.findAll({
      include: [{ model: Users, attributes: [["name", "first_name"], "last_name", "username"] }],
      // include: [{ model: Users, attributes: ["name", "last_name", "username"] }],
      // include: [{ model: Users, attributes: { exclude: ["id"] } }],
      where: {
        id_product: productId,
      },
    })
    if (findReviews.length) return findReviews
    else throw new Error("The are no reviews for this product.")
  } catch (error) {
    return error
  }
}
export const getReviewsUser = async (userId: UsersI["id"]) => {
  try {
    const findReviews = await Reviews.findAll({
      where: {
        id_user: userId,
      },
    })
    if (findReviews) return findReviews
    else return
  } catch (error) {
    return error
  }
}

export const postReview = async (review: ReviewsPostI) => {
  try {
    const newReview = await Reviews.create(review)
    return newReview
  } catch (error) {
    return error
  }
  // Si ya existe
  /*   try {
    const { id_product, id_user } = review
    const finOne = await Reviews.findOne({
      where: {
        id_product: id_product,
        id_user: id_user,
        isActive: true,
      },
    })
    if (finOne) return new Error("There is already a review for this product")
  } catch (error) {
    return error
  } */
}
export const patchReview = () => {}

export const deleteReview = async (id_user: UsersI["id"], id_product: ProductsI["id"]) => {
  try {
    const deletedReview: any = await Reviews.findOne({ where: { id_product: id_product, id_user: id_user } })
    const res = deletedReview
    await deletedReview?.destroy()
    return res
  } catch (error) {
    return error
  }
}
