import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { SupportedProviders } from '../constants/providers';
import { processImagesForGoogle } from '../utils/images';
import { getProviderConfig } from '../utils/providers';
import { processVideosForGoogle } from '../utils/videos';

export class AIHandler {
	config: any;
	api: any;

	constructor(
		private readonly provider?: SupportedProviders,
		private readonly model?: string,
		private readonly apiKey?: string
	) {
		if (!provider || !model) {
			throw new Error('Provider and model are required');
		}

		this.provider = provider;
		this.model = model;

		this.config = getProviderConfig(provider, apiKey);

		if (
			this.provider === SupportedProviders.DeepSeek ||
			this.provider === SupportedProviders.OpenAI
		) {
			this.api = new OpenAI(this.config);
		} else if (this.provider === SupportedProviders.Google) {
			this.api = new GoogleGenAI(this.config);
		} else {
			throw new Error(`Provider ${this.provider} not supported`);
		}
	}

	async query(prompt: string, images: string[] = [], videos: string[] = []) {
		if (
			this.provider === SupportedProviders.DeepSeek ||
			this.provider === SupportedProviders.OpenAI
		) {
			if (images.length > 0) {
				console.error('OpenAI images are not implemented yet');
			}

			if (videos.length > 0) {
				console.error('OpenAI videos are not implemented yet');
			}

			const response = await this.api.chat.completions.create({
				model: this.model,
				messages: [{ role: 'user', content: prompt }]
			});

			return response.choices[0].message.content.trim();
		} else if (this.provider === SupportedProviders.Google) {
			const imageParts = await processImagesForGoogle(images);
			const videoParts = await processVideosForGoogle(videos);

			const response = await this.api.models.generateContent({
				model: this.model,
				contents: [prompt, ...imageParts, ...videoParts]
			});

			return response.text;
		}

		throw new Error(`Provider ${this.provider} not supported`);
	}
}
