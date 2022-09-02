import { Router } from 'express'
import Category from './routes/Category';


const router = Router();
router.use('/', Category)

router.get('/', (_req, res)=>{
  res.send("todo ok");

})



module.exports = router;
