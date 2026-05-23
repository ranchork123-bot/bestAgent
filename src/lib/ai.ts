// src/lib/ai.ts

/**
 * FEATURE: Ollama local LLM support
 * Add Ollama as an AI provider option: http://localhost:11434/api
 */
export async function callLocalOllama(prompt: string, model: string = 'llama3'): Promise<string> {
  console.log(`Calling local Ollama with model ${model}...`);
  // Mock Ollama fetch
  return `Mock response from Ollama (${model}): ${prompt.substring(0, 20)}...`;
}

/**
 * FEATURE: BM25 relevance filtering
 * Add to comet-browse edge function. Score each paragraph by query terms. Return only top-scoring paragraphs
 */
export function filterContentBM25(content: string, query: string): string {
  console.log(`Filtering content using BM25 for query: "${query}"`);
  // Mock BM25 logic: returning first 200 chars
  return content.substring(0, 200);
}

/**
 * FEATURE: AI workflow builder (natural language)
 * Describe workflow -> LLM generates workflow JSON -> renders as nodes
 */
export async function generateWorkflowFromNaturalLanguage(description: string): Promise<Record<string, unknown>[]> {
  console.log(`Generating workflow for: "${description}"`);
  return [
    { type: 'trigger', id: 'n1', label: 'Start' },
    { type: 'action', id: 'n2', label: 'AI Task' }
  ];
}
