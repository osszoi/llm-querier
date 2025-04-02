import express from 'express';
import { queryController } from './controllers/ai';

export const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
	res.send('OK');
});

app.post('/ai/query', queryController);
