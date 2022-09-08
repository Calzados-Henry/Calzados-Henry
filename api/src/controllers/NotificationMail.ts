//import express  from "express";
const nodemailer = require("nodemailer")
const sendgriTransport = require("nodemailer-sendgrid-transport")

const transporter = nodemailer.createTransport(
  sendgriTransport(
    {
      auth: {
        api_key: process.env.API_KEY
      }
    }
  ))

export const send = (email: string, msg: string) => {
  transporter.sendMail({
    to: email,
    from: "sohes2022@protonmail.com",
    subject: "Prueba",
    text: msg
  })
}