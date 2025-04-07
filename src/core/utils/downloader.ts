import fs from 'fs';
import os from 'os';

export const downloadFile = async (url: string, baseOutputPath = os.tmpdir()) => {
	console.log(`Downloading file from ${url} to ${baseOutputPath}`);
	const response = await fetch(url);
	const blob = await response.blob();
	const fileName = url.split('/').pop();
	const outputPath = `${baseOutputPath}/${fileName}`;
	fs.writeFileSync(outputPath, Buffer.from(await blob.arrayBuffer()));
	return outputPath;
};

export const downloadFiles = async (
	urls: string[],
	baseOutputPath = os.tmpdir()
) => {
	console.log(`Downloading files from ${urls} to ${baseOutputPath}`);
	const blobs = await Promise.all(
		urls.map((url) => downloadFile(url, baseOutputPath))
	);
	return blobs;
};
