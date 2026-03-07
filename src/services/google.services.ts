import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { config } from "@/config/google.config";

export class AIService {
  constructor() {
    if (!config.googleApiKey) {
      throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set in env");
    }

    console.log(
      "API KEY:",
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ? "LOADED" : "MISSING",
    );
  }

  async structureMarkdown(markdown: string): Promise<string> {
    const prompt = `You are a Markdown structuring assistant.

Your task is to convert raw technical notes into properly structured Markdown.

Rules:
* Do not rewrite sentences
* Do not remove information
* Only improve formatting and structure
* Convert section titles into headings
* Convert repeated lines into lists
* Wrap technical identifiers in backticks
* Preserve code blocks exactly as they are
* Maintain the original meaning and content

Return only valid Markdown without any additional text or explanations.

Here is the markdown to structure:

${markdown}`;

    try {
      const { text } = await generateText({
        model: google(config.model as any),
        prompt: prompt,
        temperature: 0.1,
        maxOutputTokens: 4000,
      });

      return text.trim();
    } catch (error) {
      console.error("Error calling Google AI:", error);
      throw new Error(
        `Failed to structure markdown: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
