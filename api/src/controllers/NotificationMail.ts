const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_MAIL_KEY;
const transporter = new Sib.TransactionalEmailsApi();

const sender = {
	name: 'SEHOS PF',
	email: 'sohes2022@hotmail.com',
};
export const send = (email: string, subject: string, content: string) => {
	const receiver = [{ email }];
	transporter.sendTransacEmail({
		sender,
		to: receiver,
		subject,
		htmlContent: `<!DOCTYPE html><html><body><h1>${subject}</h1><p>${content}</p></body></html>`,
		//textContent: content,
	});
};
