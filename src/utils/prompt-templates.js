const promptTemplates = {
	rephrase: (text) => `Rephrase the following text while maintaining its meaning: "${text}"`,
	improve: (text) => `Improve the following text by enhancing its clarity and style: "${text}"`,
	summarize: (text) => `Summarize the following text in a concise manner: "${text}"`,
};

export default promptTemplates;
