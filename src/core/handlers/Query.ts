import { SupportedProviders } from '../../core/constants/providers';
import { getPrompt } from '../../core/utils/prompt';
import { AIHandler } from './AIHandler';
import { processContext } from './context';
import { processExamples } from './examples';
import { processReferences } from './references';

interface Body {
	prompt: string;
	model?: string;
	provider?: SupportedProviders;
	images?: string[];
	scrapeUrls?: string[];
	fileUrls?: string[];
	examples?: string[];
	context?: string[];
}

export const query = async ({
	prompt,
	model,
	provider,
	images = [], // TBI
	scrapeUrls = [],
	fileUrls = [],
	examples: _examples = [],
	context: _context = []
}: Body): Promise<string> => {
	// env provider and model
	const envProvider = process.env.PROVIDER as SupportedProviders;
	const envModel = process.env.MODEL;

	const handler = new AIHandler(provider || envProvider, model || envModel);

	const context: any[] = processContext(_context);
	const references: any[] = await processReferences({ scrapeUrls, fileUrls });
	const examples: any[] = processExamples(_examples);

	const enhancedPrompt = getPrompt({
		prompt,
		context,
		references,
		examples
	});

	const response = await handler.query(enhancedPrompt, images);

	return response;
};
