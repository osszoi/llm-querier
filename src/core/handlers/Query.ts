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
	model = 'deepseek-chat',
	provider = SupportedProviders.DeepSeek,
	images = [], // TBI
	scrapeUrls = [],
	fileUrls = [],
	examples: _examples = [],
	context: _context = []
}: Body): Promise<string> => {
	const handler = new AIHandler(provider, model);

	const context: any[] = processContext(_context);
	const references: any[] = await processReferences({ scrapeUrls, fileUrls });
	const examples: any[] = processExamples(_examples);

	const enhancedPrompt = getPrompt({
		prompt,
		context,
		references,
		examples
	});

	const response = await handler.query(enhancedPrompt);

	return response;
};
