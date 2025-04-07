import { SupportedProviders } from '../constants/providers';

export const getProviderConfig = (provider: SupportedProviders) => {
	switch (provider) {
		case SupportedProviders.DeepSeek:
			if (!process.env.DEEPSEEK_API_KEY) {
				throw new Error('DEEPSEEK_API_KEY is not set');
			}

			return {
				baseURL: 'https://api.deepseek.com',
				apiKey: process.env.DEEPSEEK_API_KEY || ''
			};
		case SupportedProviders.Google:
			if (!process.env.GOOGLE_API_KEY) {
				throw new Error('GOOGLE_API_KEY is not set');
			}

			return {
				apiKey: process.env.GOOGLE_API_KEY || ''
			};
		default:
			throw new Error(`Provider ${provider} not supported`);
	}
};
