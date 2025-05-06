import * as fs from 'node:fs';

const MAX_INLINE_FILE_SIZE_BYTES = 18 * 1024 * 1024; // ~18MB, leaving buffer for base64 expansion and rest of request

export async function processVideosForGoogle(videos: string[]) {
	return videos
		.map((video) => {
			try {
				// Check if it looks like a URL (simple check)
				if (
					video.startsWith('http://') ||
					video.startsWith('https://') ||
					video.includes('youtube.com') ||
					video.includes('youtu.be')
				) {
					return {
						fileData: {
							fileUri: video,
							mimeType: 'video/mp4' // Or potentially 'video/*' if API supports it
						}
					};
				} else {
					// Assume local file path
					if (!fs.existsSync(video)) {
						console.warn(`Local video file not found, skipping: ${video}`);
						return null;
					}

					// Check file size before reading
					const stats = fs.statSync(video);
					if (stats.size > MAX_INLINE_FILE_SIZE_BYTES) {
						console.warn(
							`Local video file exceeds size limit (${MAX_INLINE_FILE_SIZE_BYTES} bytes), skipping: ${video} (${stats.size} bytes)`
						);
						// TODO: Consider implementing File API upload for large files
						return null;
					}

					const fileContent = fs.readFileSync(video);
					const base64Data = fileContent.toString('base64');
					const mimeType = 'video/mp4'; // Defaulting to mp4 for local files for simplicity

					return {
						inlineData: {
							mimeType: mimeType,
							data: base64Data
						}
					};
				}
			} catch (error) {
				console.error(`Error processing video ${video}:`, error);
				return null; // Skip video on error
			}
		})
		.filter((item) => item !== null); // Filter out any null entries from errors/skips
}
