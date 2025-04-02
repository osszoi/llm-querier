import { JSDOM } from 'jsdom';
import puppeteer from 'puppeteer';

const basicScrape = async (url: string) => {
	const response = await fetch(url);
	const html = await response.text();
	const dom = new JSDOM(html);
	const document = dom.window.document;
	const content = document
		.querySelector('body')
		?.textContent?.trim()
		.replaceAll('\n', ' ')
		.replaceAll('\r', ' ')
		.replaceAll('\t', ' ');

	// save content to a file before processing
	// fs.writeFileSync('content.txt', content);

	return content;
};

export const getContentFromUrl = async (url: string, approach = 'headless') => {
	if (approach === 'basic') {
		return basicScrape(url);
	}

	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.setUserAgent(
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
	);

	// Navigate to the URL and wait for network to be idle (all JS loaded)
	await page.goto(url, { waitUntil: 'domcontentloaded' });

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	await delay(5000); // Wait 5 seconds

	// Get the content from the body
	const content = await page.evaluate(() => {
		return document.body?.textContent?.trim().replace(/\s+/g, ' ');
	});

	// Save content to a file before processing
	// fs.writeFileSync('temp/content.txt', content ?? '');

	await browser.close();
	return content;
};
