const { Router } = require('express');
// const Diets = require('./Diets.js');
// const Recipe = require('./Recipe.js');


const router = Router();

router.get('/', (req,res)=>{
  res.send("todo ok");
})



module.exports = router;
