import { GoogleGenAI } from '@google/genai';
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
		} else if (this.provider === SupportedProviders.Google) {
			this.api = new GoogleGenAI(this.config);
		} else {
			throw new Error(`Provider ${this.provider} not supported`);
		}
	}

	async query(prompt: string) {
		if (this.provider === SupportedProviders.DeepSeek) {
			const response = await this.api.chat.completions.create({
				model: this.model,
				messages: [{ role: 'user', content: prompt }]
			});

			return response.choices[0].message.content.trim();
		} else if (this.provider === SupportedProviders.Google) {
			const response = await this.api.models.generateContent({
				model: 'gemini-2.0-flash',
				contents: prompt
			});

			return response.text;
		}

		throw new Error(`Provider ${this.provider} not supported`);
	}
}
