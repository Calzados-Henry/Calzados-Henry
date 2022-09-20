import express from "express"
//import {/*  Router, */ Request, Response, NextFunction } from 'express';
import routes from "./routes/index"
import bodyParser from "body-parser"
import { errorHandler } from "./middleware/handleErrors"
const cors = require("cors")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
require("dotenv").config()

/* import Stripe from 'stripe'; */

const STRIPE_TOKEN: string = process.env.STRIPE_TOKEN as string
const stripe = require("stripe")(STRIPE_TOKEN)

/* stripe(STRIPE_TOKEN) */
require('./db');
const server = express();

// let allowCors = function (_req: Request, res: Response, next: NextFunction) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', "true");

//   // Pass to next layer of middleware
//   next();
// }



// server.name = 'API';
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
server.use(bodyParser.json({ limit: "50mb" }))
server.use(cookieParser())
server.use(morgan("dev"))
//server.use(allowCors)
server.use(cors({ credentials: true, origin: "http://localhost:3000", methods: ["GET", "PUT", "POST", "PATCH", "DELETE"] }))
// server.use((_req: Request, res: Response, next: NextFunction) => {
//   res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });

server.use(express.json())
/* server.options */
server.post('/api/checkout', async (req, res) => {

  try {
    const { id, amount } = req.body
    /* const monto=200; */
    const paymentIntent = await stripe.paymentIntents.create({

      currency: "USD",
      description: "console",
      payment_method: id,
      confirm: true,
      amount
    })

    console.log(req.body)
    console.log(paymentIntent)
    res.send(paymentIntent)
  } catch (error: any) {
    console.log(error)
    console.log(error.raw.message)
    res.status(404).json({ msg: error.raw.message })
  }

})

server.use('/', routes);

//CONTROLADOR DE ERRORES, USAR NEXT EN EL CATCH PARA USAR ESTO
server.use(errorHandler)

export default server;