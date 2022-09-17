import { Router } from 'express';
import SendRecoveryInstructions from '../controllers/ResetPassword/SendRecoveryInstructions';

const RecoveryPassword = Router();

RecoveryPassword.post('/', async (req, res) => {
	const { email } = req.body;

	try {
		const successfullyEmailSended = await SendRecoveryInstructions(email);

		res.status(200).send({ success: successfullyEmailSended });
	} catch (err: any) {
		res.status(404).json({ error: err.message });
	}
});

export default RecoveryPassword;
