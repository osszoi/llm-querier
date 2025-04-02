import { query } from '../core/handlers/Query';

export const queryController = async (req: any, res: any) => {
	try {
		const response = await query(req.body);

		res.send(response);
	} catch (error) {
		console.error(error);
		res.status(500).send(`Error querying AI, reason: ${error}`);
	}
};
