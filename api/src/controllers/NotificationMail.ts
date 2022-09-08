const Sib = require('sib-api-v3-sdk')
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY
const transporter = new Sib.TransactionalEmailsApi()

const sender = {
    email:"sohes2022@hotmail.com"
}
const send = (email: string, subject: string, content: string) => {
const receiver = [{email}]
    transporter.sendTransacEmail({
        sender,
        to: receiver,
        subject,
        textContent: content   
    })
}



export default send
