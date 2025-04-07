import fs from 'fs';

export const downloadFile = async (url: string, baseOutputPath = './temp') => {
	const response = await fetch(url);
	const blob = await response.blob();
	const fileName = url.split('/').pop();
	const outputPath = `${baseOutputPath}/${fileName}`;
	fs.writeFileSync(outputPath, Buffer.from(await blob.arrayBuffer()));
	return outputPath;
};

export const downloadFiles = async (
	urls: string[],
	baseOutputPath = './temp'
) => {
	const blobs = await Promise.all(
		urls.map((url) => downloadFile(url, baseOutputPath))
	);
	return blobs;
};
