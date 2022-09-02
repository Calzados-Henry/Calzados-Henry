import express from 'express'
import { sequelize } from './src/database'

const app = express()



app.listen(3001, () => {
  console.log(`App runing at http://localhost:8080`)
  sequelize.authenticate().then(async () => {
    console.log("Database conected")

    try {
      await sequelize.sync({ force: true })
    } catch (error: any) {
      console.log(error.message)

    }
  }).catch((e: any) => {
    console.log(e.message)
  })
})