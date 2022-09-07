//import express  from "express";
const nodemailer = require("nodemailer")
const sendgriTransport = require("nodemailer-sendgrid-transport")



const transporter = nodemailer.createTransport(
    sendgriTransport(
    {
        auth:{
            api_key: process.env.API_KEY
        }
    }
))

const send = (email: string) => {

    transporter.sendMail({
        to: email,
        from:"sohes2022@protonmail.com",
        subject: "Hello ✔",
        text: "Hello ✔"
    })
}



export default send