interface Prompt {
	prompt: string;
	context: string[];
	references: string[];
	examples: string[];
}

export const promptContext = (context: string): string => {
	return `
    <context>
      ${context}
    </context>
  `;
};

export const promptReference = (reference: string): string => {
	return `
    <reference>
      ${reference}
    </reference>
  `;
};

export const userInput = (input: string): string => {
	return `
    <user_input>
      ${input}
    </user_input>
  `;
};

export const promptExample = (example: string): string => {
	return `
    <example>
      ${example}
    </example>
  `;
};

const context = (context: string[]): string => {
	if (!context.length) return '';

	return `
    <context>
      ${context.join('\n')}
    </context>
  `;
};

const references = (references: string[]): string => {
	if (!references.length) return '';

	return `
    <references>
      ${references.join('\n')}
    </references>
  `;
};

const examples = (examples: string[]): string => {
	if (!examples.length) return '';

	return `
    <examples>
      ${examples.join('\n')}
    </examples>
  `;
};

const role = () => {
	return `
    <role>
      You are a powerful AI assistant.
      You are given a prompt and additional context.
      You need to generate a response to the prompt.
      You need to use the additional context to generate a response to the prompt.
      You should only use the additional context if it is relevant to the prompt.
      You should not use the additional context if it is not relevant to the prompt.
      You should only respond with the answer to the prompt.
      You should not describe the process you used to generate the response.
      You should not respond with the references used to generate the response.
      You should be concise and to the point.
      You must provide a short answer to the user input.
    </role>
  `;
};

export const getPrompt = ({
	prompt,
	context: _context = [],
	references: _references = [],
	examples: _examples = []
}: Prompt) => {
	return `
    ${role()}

    ${userInput(prompt)}

    ${context(_context)}

    ${references(_references)}

    ${examples(_examples)}
  `;
};
