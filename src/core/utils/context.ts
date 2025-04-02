import { downloadFiles } from 'src/core/utils/downloader';
import { getContentFromUrl } from 'src/core/utils/scrapper';

export const getContentFromFileUrl = async (url: string) => {
	const files = await downloadFiles([url]);
	return files[0];
};

export const getContextFromUrl = async (url: string) => {
	const content = await getContentFromUrl(url);
	return content;
};

export const getContextFromUrls = async (urls: string[]) => {
	const contents = await Promise.all(urls.map(getContextFromUrl));
	return contents.join('\n');
};
