import promptTemplates from "../utils/prompt-templates.js";
import { OpenAI } from "openai";

async function aiEnhancer(req, res) {
	const { text, type } = req.body;

	const client = new OpenAI({
		apiKey: process.env["OPENAI_API_KEY"],
	});

	if (!text || !type) {
		return res.status(400).json({ error: "Missing required parameters" });
	}

	if (!promptTemplates[type]) {
		return res.status(400).json({ error: "Invalid type" });
	}

	try {
		const prompt = promptTemplates[type](text);

		const completion = await client.chat.completions.create({
			messages: [{ role: "user", content: prompt }],
			model: "gpt-3.5-turbo",
		});

		const enhancedText = completion.choices[0].message.content.trim();

		res.json({ result: enhancedText });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "An error occurred while processing your request" });
	}
}

export default aiEnhancer;
