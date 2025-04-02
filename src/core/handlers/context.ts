import { promptContext } from '../utils/prompt';

export const processContext = (context: string[]) => {
	return context.map((item) => {
		return promptContext(JSON.stringify(item));
	});
};
