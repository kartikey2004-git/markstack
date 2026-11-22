import { AIService } from "@/services/google.services";

// Created on first use rather than at import time, so that importing a module
// that transitively depends on the AI client (e.g. during `next build` page
// data collection) does not require GOOGLE_GENERATIVE_AI_API_KEY to be set.
let client: AIService | undefined;

export function getAIClient(): AIService {
  client ??= new AIService();
  return client;
}
