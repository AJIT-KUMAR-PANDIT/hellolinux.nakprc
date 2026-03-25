import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AIProvider = "gemini" | "local";

export type AISettings = {
  provider: AIProvider;

  // Gemini
  geminiApiKey: string;
  geminiModel: string;

  // Local LLM via MQTT
  localLLMUrl: string;
  localLLMApiKey: string;
  localLLMModel: string;
  mqttBrokerUrl: string;
  mqttRequestTopic: string;
  mqttResponseTopic: string;
  mqttTimeoutMs: number;

  // Voice Settings
  autoTTS: boolean;
  sttEnabled: boolean;

  // Actions
  setProvider: (p: AIProvider) => void;
  setGeminiApiKey: (v: string) => void;
  setGeminiModel: (v: string) => void;
  setLocalLLMUrl: (v: string) => void;
  setLocalLLMApiKey: (v: string) => void;
  setLocalLLMModel: (v: string) => void;
  setMqttBrokerUrl: (v: string) => void;
  setMqttRequestTopic: (v: string) => void;
  setMqttResponseTopic: (v: string) => void;
  setMqttTimeoutMs: (v: number) => void;
  setAutoTTS: (v: boolean) => void;
  setSTTEnabled: (v: boolean) => void;
};

export const useAISettingsStore = create<AISettings>()(
  persist(
    (set) => ({
      provider: "gemini",

      geminiApiKey: import.meta.env.VITE_GOOGLE_API_KEY ?? "",
      geminiModel: import.meta.env.VITE_GEMINI_MODEL ?? "gemini-2.0-flash-lite",

      localLLMUrl: import.meta.env.VITE_LOCAL_LLM_URL ?? "http://localhost:1234/v1/chat/completions",
      localLLMApiKey: import.meta.env.VITE_LOCAL_LLM_API_KEY ?? "",
      localLLMModel: import.meta.env.VITE_LOCAL_MODEL ?? "local-model",

      mqttBrokerUrl: import.meta.env.VITE_MQTT_BROKER_URL ?? "wss://broker.hivemq.com:8884/mqtt",
      mqttRequestTopic: import.meta.env.VITE_MQTT_REQUEST_TOPIC ?? "hellolinux/ai/request",
      mqttResponseTopic: import.meta.env.VITE_MQTT_RESPONSE_TOPIC ?? "hellolinux/ai/response",
      mqttTimeoutMs: Number(import.meta.env.VITE_MQTT_TIMEOUT_MS ?? 8000),

      // Voice defaults
      autoTTS: false,
      sttEnabled: true,

      setProvider: (provider) => set({ provider }),
      setGeminiApiKey: (geminiApiKey) => set({ geminiApiKey }),
      setGeminiModel: (geminiModel) => set({ geminiModel }),
      setLocalLLMUrl: (localLLMUrl) => set({ localLLMUrl }),
      setLocalLLMApiKey: (localLLMApiKey) => set({ localLLMApiKey }),
      setLocalLLMModel: (localLLMModel) => set({ localLLMModel }),
      setMqttBrokerUrl: (mqttBrokerUrl) => set({ mqttBrokerUrl }),
      setMqttRequestTopic: (mqttRequestTopic) => set({ mqttRequestTopic }),
      setMqttResponseTopic: (mqttResponseTopic) => set({ mqttResponseTopic }),
      setMqttTimeoutMs: (mqttTimeoutMs) => set({ mqttTimeoutMs }),
      setAutoTTS: (autoTTS) => set({ autoTTS }),
      setSTTEnabled: (sttEnabled) => set({ sttEnabled }),
    }),
    { name: "hellolinux-ai-settings" } // persisted to localStorage
  )
);
