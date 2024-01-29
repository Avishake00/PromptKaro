import Prompt from "@schema/prompt";
import { connectDB } from "@utils/database";

export  async function POST(req, res) {
 
    try {
      await connectDB();
      const { prompt, userId, tag } = await req.json();

      const newPrompt = new Prompt({
        creator: userId,
        prompt,
        tag,
      });

      await newPrompt.save();

      return new Response(JSON.stringify(newPrompt),{status:201});
    } catch (error) {
      console.error("Failed to create a new prompt:", error);
      return new Response("Failed to create a new prompt", { status: 500 });
    }
}
