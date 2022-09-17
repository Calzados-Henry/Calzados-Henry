import { NextFunction, Request, Response, Router } from "express"
import { getReviewsProduct, postReview } from "../controllers/Reviews"
import { userExtractorUser } from "../middleware/userExtractor"
import { ReviewsI, ReviewsPostI } from "../types"

const Reviews = Router()

Reviews.get("/product/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const reviewsDB = await getReviewsProduct(parseInt(id))
    res.json(reviewsDB)
  } catch (error) {
    next(error)
  }
})

Reviews.get("/user/:id", userExtractorUser, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newReview: Partial<ReviewsI> = req.body
    res.json(newReview)
  } catch (error) {
    next(error)
  }
})

/* 
export interface ReviewsI {
  id_product: number
  id_user: number
  review: string
  rate: number
  date: Date
  isActive: boolean = no va
}
*/

Reviews.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newReview: ReviewsPostI = req.body
    const response = await postReview(newReview)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
/* Reviews.patch("/", async (req: Request, res: Response, next: NextFunction) => {})
Reviews.delete("/", async (req: Request, res: Response, next: NextFunction) => {}) */

export default Reviews
