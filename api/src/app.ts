import express, { Request, Response, NextFunction } from 'express';
import routes from './routes/index';
import bodyParser from 'body-parser';
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();
const Stripe = require('stripe')

/* import Stripe from 'stripe'; */

const STRIPE_TOKEN: string = (process.env.STRIPE_TOKEN as string);


const stripe = new Stripe(STRIPE_TOKEN)

/* stripe(STRIPE_TOKEN) */
require('./db.ts');
const server = express();

// server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(express.json())

server.post('/api/checkout', async (req, res) => {

  try {
    const { id, amount } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Game Keyboard",
      payment_method: id,
      confirm: true
    })

    console.log(req.body)
    console.log(paymentIntent)
    res.send(paymentIntent)
  } catch (error) {
    console.log(error)
    res.json({msg:error})
  }

})

server.use('/', routes);

// Error catching endware.
server.use((err: any, _req: Request, res: Response, _next: NextFunction) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default server;
