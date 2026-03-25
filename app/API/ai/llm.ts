import { GoogleGenAI } from "@google/genai";
import { generateLocalLLMResponse } from "./llm-local";
import { useAISettingsStore } from "~/store/useAISettingsStore";

const SYSTEM_PROMPT = `You are "Hello Linux", an advanced AI assistant developed by AJIT KUMAR PANDIT, powered by NAKPRC.
Your primary purpose is to assist users with Linux-based systems, operating systems, terminal usage, and developer workflows.

You specialize in:
- Linux commands (basic to advanced), Shell scripting (Bash, Zsh)
- System administration, file system navigation
- Package management (apt, yum, pacman, dnf, etc.)
- Process management and monitoring, networking commands
- Permissions and user management
- Development environment setup (Node.js, Python, Docker, Git, etc.)
- Troubleshooting OS-level issues

### Behavior Rules:
1. Assume the user is a beginner or intermediate developer.
2. Provide clear, direct, minimal explanations — commands first, explanation second.
3. Prefer short, efficient, real-world commands over lengthy alternatives.
4. Include a WARNING for risky commands (e.g., rm, sudo).
5. Maintain a developer-friendly tone — precise, confident, helpful.

### Identity (only when asked "who are you"):
"I am Hello Linux, an AI assistant developed by AJIT KUMAR PANDIT, powered by NAKPRC."`;

async function generateGeminiResponse(userMessage: string): Promise<string> {
  const { geminiApiKey, geminiModel } = useAISettingsStore.getState();
  const key = geminiApiKey || (import.meta.env.VITE_GOOGLE_API_KEY as string);
  const model = geminiModel || "gemini-2.0-flash-lite";

  if (!key) throw new Error("No Gemini API key set. Go to Account → Settings to add one.");

  const ai = new GoogleGenAI({ apiKey: key });
  const response = await ai.models.generateContent({
    model,
    contents: userMessage,
    config: { systemInstruction: SYSTEM_PROMPT },
  });

  const text = typeof response.text === 'function'
    ? (response.text as unknown as () => string)()
    : response.text;

  return text ?? 'No response from AI.';
}

/**
 * Primary entry point — respects the provider set in Account settings.
 * "gemini"  → goes straight to Gemini API
 * "local"   → tries local LLM via MQTT, falls back to Gemini if unavailable
 */
export async function generateAIResponse(userMessage: string): Promise<string> {
  const { provider } = useAISettingsStore.getState();

  if (provider === "local") {
    console.log('[llm] Provider: local → trying MQTT bridge...');
    try {
      const localResponse = await generateLocalLLMResponse(userMessage);
      if (localResponse !== null) {
        console.log('[llm] ✅ Got response from local LLM');
        return localResponse;
      }
      console.log('[llm] Local bridge timed out → falling back to Gemini');
    } catch (err) {
      console.warn('[llm] MQTT error, falling back to Gemini:', err);
    }
  }

  console.log('[llm] Provider: gemini');
  return generateGeminiResponse(userMessage);
}
