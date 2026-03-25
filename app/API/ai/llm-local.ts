import mqtt from 'mqtt';
import { useAISettingsStore } from '~/store/useAISettingsStore';

const BROKER_URL = import.meta.env.VITE_MQTT_BROKER_URL as string ?? 'wss://broker.hivemq.com:8884/mqtt';
const REQUEST_TOPIC = import.meta.env.VITE_MQTT_REQUEST_TOPIC as string ?? 'hellolinux/ai/request';
const RESPONSE_TOPIC = import.meta.env.VITE_MQTT_RESPONSE_TOPIC as string ?? 'hellolinux/ai/response';
const TIMEOUT_MS = Number(import.meta.env.VITE_MQTT_TIMEOUT_MS ?? 8000);

let mqttClient: mqtt.MqttClient | null = null;
let isConnected = false;

function getClient(): mqtt.MqttClient {
  if (mqttClient) return mqttClient;

  mqttClient = mqtt.connect(BROKER_URL, {
    clientId: `hellolinux-browser-${Math.random().toString(16).slice(2)}`,
    clean: true,
    reconnectPeriod: 0, // Don't auto-reconnect — we'll connect on demand
  });

  mqttClient.on('connect', () => { isConnected = true; });
  mqttClient.on('error', () => { isConnected = false; });
  mqttClient.on('close', () => { isConnected = false; });

  return mqttClient;
}

/**
 * Try to get a response from the local LLM via MQTT.
 * Returns null if the local bridge times out (bridge not running).
 */
export async function generateLocalLLMResponse(userMessage: string): Promise<string | null> {
  const client = getClient();
  const requestId = Date.now().toString(36) + Math.random().toString(36).slice(2);

  return new Promise((resolve) => {
    const { localLLMApiKey, localLLMUrl, localLLMModel } = useAISettingsStore.getState();
    const timer = setTimeout(() => {
      // Timeout — local bridge probably isn't running
      client.unsubscribe(RESPONSE_TOPIC);
      resolve(null);
    }, TIMEOUT_MS);

    client.subscribe(RESPONSE_TOPIC, () => {
      // Publish the request with current settings from store
      client.publish(REQUEST_TOPIC, JSON.stringify({ 
        id: requestId, 
        message: userMessage,
        config: {
          apiKey: localLLMApiKey,
          url: localLLMUrl,
          model: localLLMModel
        }
      }));

      client.on('message', (topic, payload) => {
        if (topic !== RESPONSE_TOPIC) return;
        let data: { id: string; text?: string; error?: string };
        try {
          data = JSON.parse(payload.toString());
        } catch {
          return;
        }
        if (data.id !== requestId) return;

        clearTimeout(timer);
        client.unsubscribe(RESPONSE_TOPIC);

        if (data.error) {
          resolve(`⚠️ Local LLM error: ${data.error}`);
        } else {
          resolve(data.text ?? null);
        }
      });
    });
  });
}

/** Check if the MQTT broker connection is likely available */
export function isLocalLLMAvailable(): boolean {
  return isConnected;
}
