import pdfParse from 'pdf-parse';

/**
 * Extracts text from a PDF file buffer
 * @param pdfBuffer - Buffer of the PDF file
 * @returns Extracted text from the PDF
 */
export const extractTextFromPDF = async (
	pdfBuffer: Buffer
): Promise<string> => {
	try {
		const data = await pdfParse(pdfBuffer);
		return data.text;
	} catch (error) {
		console.error('Error parsing PDF:', error);
		throw new Error('Failed to parse PDF file');
	}
};

/**
 * Processes an array of PDF files and returns their text content
 * @param pdfFiles - Array of PDF files as Buffer objects
 * @returns Array of extracted text from each PDF
 */
export const processPDFFiles = async (
	pdfFiles: Buffer[]
): Promise<string[]> => {
	try {
		const textContents = await Promise.all(
			pdfFiles.map((file) => extractTextFromPDF(file))
		);
		return textContents;
	} catch (error) {
		console.error('Error processing PDF files:', error);
		throw new Error('Failed to process PDF files');
	}
};
