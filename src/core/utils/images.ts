export const downloadImage = async (
	url: string
): Promise<{ base64: string; mimeType: string }> => {
	const response = await fetch(url);
	const arrayBuffer = await response.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const mimeType = response.headers.get('content-type') || 'image/jpeg';

	return {
		base64: buffer.toString('base64'),
		mimeType
	};
};

export async function processImagesForGoogle(images: string[]) {
	const imageParts = await Promise.all(images.map(downloadImage));

	return imageParts.map((part) => ({
		inlineData: {
			data: part.base64,
			mimeType: part.mimeType
		}
	}));
}
