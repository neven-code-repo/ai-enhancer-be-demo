import promptTemplates from "../utils/prompt-templates.js";
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
	apiKey: process.env["OPENAI_API_KEY"],
});

const resolvers = {
	Query: {
		enhanceText: async (_, { text, type }) => {
			if (!promptTemplates[type]) {
				throw new Error("Invalid type");
			}

			try {
				const prompt = promptTemplates[type](text);

				const completion = await client.chat.completions.create({
					messages: [{ role: "user", content: prompt }],
					model: "gpt-3.5-turbo",
				});

				const enhancedText = completion.choices[0].message.content.trim();

				console.log("enhancedText", enhancedText);

				return { result: enhancedText };
			} catch (error) {
				console.error("Error:", error);
				throw new Error("An error occurred while processing your request");
			}
		},
	},
};

export default resolvers;
