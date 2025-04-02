import { getContentFromFileUrl, getContextFromUrl } from '../utils/context';

interface Props {
	scrapeUrls: string[];
	fileUrls: string[];
}

export const processReferences = async ({
	scrapeUrls = [],
	fileUrls = []
}: Props) => {
	const references: string[] = [];

	for (const url of scrapeUrls) {
		try {
			const content = await getContextFromUrl(url);
			references.push(content);
		} catch (error) {
			console.error(`Error getting content from url: ${url}`);
		}
	}

	for (const url of fileUrls) {
		try {
			const content = await getContentFromFileUrl(url);
			references.push(content);
		} catch (error) {
			console.error(`Error getting content from file url: ${url}`);
		}
	}

	return references;
};
