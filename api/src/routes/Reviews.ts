import { NextFunction, Request, Response, Router } from "express"
import { ZodError } from "zod"
import { deleteReview, getReviewsProduct, getReviewsUser, postReview } from "../controllers/Reviews"
import { userExtractorUser } from "../middleware/userExtractor"
import { ReviewsPostI } from "../types"
import { ReviewSchema } from "../validators/Reviews"

const Reviews = Router()

Reviews.get("/product/:id_product", async (req: Request, res: Response) => {
  try {
    const { id_product } = req.params
    const reviewsDB = await getReviewsProduct(parseInt(id_product))
    return res.json(reviewsDB)
  } catch (error) {
    return res.status(500).json(error)
  }
})

Reviews.get("/user/:id_user", async (req: Request, res: Response) => {
  try {
    const { id_user } = req.params
    const result = await getReviewsUser(parseInt(id_user))
    return res.json(result)
  } catch (error) {
    return res.status(500).json(error)
  }
})

Reviews.post("/", userExtractorUser, async (req: Request, res: Response) => {
  try {
    req.body.rate = Number(req.body.rate)
    req.body.id_product = Number(req.body.id_product)
    const result: ReviewsPostI = ReviewSchema.parse(req.body)
    const response = await postReview(result)
    return res.json(response)
  } catch (error) {
    if (error instanceof ZodError)
      return res.status(500).json(error.issues.map((issue) => ({ message: issue.message })))
  }
  return
})

Reviews.delete("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_user, id_product } = req.body
    const response = await deleteReview(id_user, id_product)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

/* Reviews.patch("/", async (req: Request, res: Response, next: NextFunction) => {})
 */

export default Reviews
