import { promptExample } from '../utils/prompt';

export const processExamples = (examples: string[]) => {
	return examples.map((item) => {
		return promptExample(JSON.stringify(item));
	});
};
