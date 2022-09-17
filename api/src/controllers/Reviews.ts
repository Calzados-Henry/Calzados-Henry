import { Reviews } from "../db"
import { ProductsI, UsersI, ReviewsPostI } from "../types"

export const getReviewsProduct = async (productId: ProductsI["id"]) => {
  try {
    const findReviews = await Reviews.findAll({
      where: {
        id_product: productId,
      },
    })
    if (findReviews) return findReviews
    else return
  } catch (error) {
    return error
  }
}
export const getReviewsUser = async (userId: UsersI["id"]) => {
  try {
    const findReviews = await Reviews.findAll({
      where: {
        id_product: userId,
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
}
export const patchReview = () => {}
export const deleteReview = () => {}
