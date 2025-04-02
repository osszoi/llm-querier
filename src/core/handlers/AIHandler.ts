import OpenAI from 'openai';
import { SupportedProviders } from '../constants/providers';
import { getProviderConfig } from '../utils/providers';

export class AIHandler {
	config: any;
	api: any;

	constructor(
		private readonly provider: SupportedProviders,
		private readonly model: string
	) {
		this.provider = provider;
		this.model = model;

		this.config = getProviderConfig(provider);

		if (this.provider === SupportedProviders.DeepSeek) {
			this.api = new OpenAI(this.config);
		} else {
			throw new Error(`Provider ${this.provider} not supported`);
		}
	}

	async query(prompt: string) {
		if (this.provider === SupportedProviders.DeepSeek) {
			return this.api.chat.completions.create({
				model: this.model,
				messages: [{ role: 'user', content: prompt }]
			});
		}

		throw new Error(`Provider ${this.provider} not supported`);
	}
}
