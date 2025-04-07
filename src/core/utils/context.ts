import fs from 'fs';
import { extractTextFromPDF } from 'src/services/ai/pdfParser';
import { downloadFiles } from '../../core/utils/downloader';
import { getContentFromUrl } from '../../core/utils/scrapper';

export const getContentFromFileUrl = async (url: string) => {
	const files = await downloadFiles([url]);
	const buffer = fs.readFileSync(files[0]);
	const text = await extractTextFromPDF(buffer);

	console.log(text);

	return text;
};

export const getContextFromUrl = async (url: string) => {
	const content = await getContentFromUrl(url);
	return content;
};

export const getContextFromUrls = async (urls: string[]) => {
	const contents = await Promise.all(urls.map(getContextFromUrl));
	return contents.join('\n');
};
