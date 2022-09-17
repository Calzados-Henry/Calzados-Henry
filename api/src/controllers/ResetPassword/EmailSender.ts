const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_MAIL_KEY;
const transporter = new Sib.TransactionalEmailsApi();

const sender = {
	name: 'SEHOS PF',
	email: 'sohes2022@hotmail.com',
};

const URL = 'http://localhost:3000';

export const sendEmailInstructions = (email: string, subject: string, id: number, user: string) => {
	const receiver = [{ email }];
	transporter.sendTransacEmail({
		sender,
		to: receiver,
		subject,
		htmlContent: `<!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Recuperar contraseña</title>
            </head>
            <body>
                <div
                    style="
                        width: 50vw;
                        height: 50vh;
                        background-color: #ccc;
                    "
                >
                    <div
                        style="
                            width: 80%;
                            background-color: #ccc;
                            text-align: center;
                        "
                    >
                        <h1>${subject}</h1>
                    </div>
                    <div
                        style="
                            width: 80%;
                            background-color: #ccc;
                            text-align:center;
                            align-items: center;
                        "
                    >
                        <h3>Lamentamos que haya perdido su contraseña</h3>
                        <p>En acá le dejamos las instrucciones para que pueda recuperarla</p>

                    <div style="text-align: left; display: flex; align-items:center; justify-content:center">
                        <ol>
                            <li>Ingrese al enlace que le dejamos a continuación</li>
                            <li>Ingrese una nueva contraseña</li>
                            <li>Una vez confirmado puede intentar ingresar de nuevo a su cuenta</li>
                        </ol>
                    </div>

                        <div style="text-align: center">
                            <a href="${URL}/reset-password/${user}?id=${id.toString()}" target="_blank" rel="noopener noreferrer"
                                >Click aquí</a
                            >
                        </div>
                    </div>
                </div>
            </body>
        </html>`,
	});
};

export const sendEmailIvitation = (email: string, subject: string) => {
	const receiver = [{ email }];
	transporter.sendTransacEmail({
		sender,
		to: receiver,
		subject,
		htmlContent: `<!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Bienvenido!</title>
            </head>
            <body>
                <div
                    style="
                        width: 50vw;
                        height: 50vh;
                        background-color: #ccc;
                    "
                >
                    <div
                        style="
                            width: 80%;
                            background-color: #ccc;
                            text-align: center;
                        "
                    >
                        <h1>${subject}</h1>
                    </div>
                    <div
                        style="
                            width: 80%;
                            background-color: #ccc;
                            text-align:center;
                            align-items: center;
                        "
                    >
                    <h3>Lo invitamos a registrarse en nuestra página</h3>

                    <div style="text-align: center">
                        <a href="${URL}/register" target="_blank" rel="noopener noreferrer"
                            >Click aquí</a
                        >
                     </div>
                      
                    </div>
                </div>
            </body>
        </html>`,
	});
};

export const sendGoogleEmailUser = (email: string, subject: string) => {
	const receiver = [{ email }];
	transporter.sendTransacEmail({
		sender,
		to: receiver,
		subject,
		htmlContent: `<!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Bienvenido!</title>
            </head>
            <body>
                <div
                    style="
                        width: 50vw;
                        height: 50vh;
                        background-color: #ccc;
                    "
                >
                    <div
                        style="
                            width: 80%;
                            background-color: #ccc;
                            text-align: center;
                        "
                    >
                        <h1>${subject}</h1>
                    </div>
                    <div
                        style="
                            width: 80%;
                            background-color: #ccc;
                            text-align:center;
                            align-items: center;
                        "
                    >
                    <h3>Esta cuenta está registrada como usuario de Google</h3>
                    <h4>Para terminar su inicio de sesión haga en el enlace a continuación</h4>

                    <div style="text-align: center">
                        <a href="${URL}/login" target="_blank" rel="noopener noreferrer"
                            >Click aquí</a
                        >
                     </div>
                      
                    </div>
                </div>
            </body>
        </html>`,
	});
};
