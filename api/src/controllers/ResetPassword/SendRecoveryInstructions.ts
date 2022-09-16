import { Users } from '../../db';
import { sendEmailInstructions, sendEmailIvitation, sendGoogleEmailUser } from './EmailSender';

async function SendRecoveryInstructions(email: string) {
	try {
		if (!email) throw new Error('Email is required for this operation.');

		const UserByEmail: any = await Users.findOne({
			where: {
				email: email.toString().toLowerCase(),
			},
		});

		if (!UserByEmail) sendEmailIvitation(email, 'Bienvenido a SEHOS store!');
		else if (UserByEmail.type_user === 'Google') sendGoogleEmailUser(email, 'Registrado con Google Account');
		else sendEmailInstructions(email, 'Recuperar contraseña', UserByEmail.id, UserByEmail.username);

		return 'Instructions sent successfully.';
	} catch (err: any) {
		throw new Error(err.message);
	}
}

export default SendRecoveryInstructions;
