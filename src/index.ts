import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();

const port = process.env.PORT || 8082;

app.listen(port, () => {
	console.log(`LLM Querier running on port ${port}`);
});

export {};
