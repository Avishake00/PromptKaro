//get prompt

import Prompt from "@schema/prompt";
import { connectDB } from "@utils/database";

export const GET = async (request, { params }) => {
	try {
		await connectDB();

		const prompt = await Prompt.findById(params.id).populate("creator");

		if (!prompt) {
			return new Response("Prompt Not Found", { status: 404 });
		}

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch prompt", { status: 500 });
	}
};
//update prompt
export const PATCH = async (request, { params }) => {
	const { prompt, tag } = request.json();
	try {
		await connectDB();

		const existingPrompt = await Prompt.findById(params.id);

		if (!existingPrompt) {
			return new Response("Prompt Not Found", { status: 404 });
		}
		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;

		await existingPrompt.save();

		return new Response(JSON.stringify(existingPrompt), { status: 200 });
	} catch (error) {
		return new Response("Failed to update prompt", { status: 500 });
	}
};

//delete prompt
export const DELETE = async (request, { params }) => {
	try {
		await connectDB();

		const prompt = await Prompt.findByIdAndDelete(params.id);
		return new Response("Prompt Deleted Successfully", { status: 200 });
	} catch (error) {
		return new Response("Failed to delete prompt", { status: 500 });
	}
};
