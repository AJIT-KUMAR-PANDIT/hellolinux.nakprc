#!/usr/bin/env node
/**
 * local-mqtt-bridge.js
 *
 * Run this on your laptop alongside LM Studio:
 *   node local-mqtt-bridge.js
 *
 * What it does:
 *  - Connects to the public HiveMQ MQTT broker
 *  - Listens for AI prompt requests from the browser on topic: hellolinux/ai/request
 *  - Forwards them to your local LM Studio on http://localhost:1234
 *  - Publishes the AI response back on topic: hellolinux/ai/response
 */

const mqtt = require('mqtt');

const BROKER_URL = process.env.MQTT_BROKER_URL ?? 'mqtt://broker.hivemq.com';
const REQUEST_TOPIC = process.env.MQTT_REQUEST_TOPIC ?? 'hellolinux/ai/request';
const RESPONSE_TOPIC = process.env.MQTT_RESPONSE_TOPIC ?? 'hellolinux/ai/response';
const LM_STUDIO_URL = process.env.LM_STUDIO_URL ?? 'http://localhost:1234/api/v1/chat';
const LM_STUDIO_API_KEY = (process.env.LM_STUDIO_API_KEY || '').trim();
const LM_STUDIO_MODEL = process.env.LOCAL_MODEL ?? 'openai/gpt-oss-20b';

const SYSTEM_PROMPT = `You are "Hello Linux", an advanced AI assistant developed by AJIT KUMAR PANDIT, powered by NAKPRC.
Help users with Linux commands, shell scripting, system administration, and developer workflows.
Be concise, practical, and developer-friendly.`;

console.log('[bridge] Connecting to MQTT broker:', BROKER_URL);
const client = mqtt.connect(BROKER_URL, {
  clientId: `hellolinux-bridge-${Math.random().toString(16).slice(2)}`,
  clean: true,
  reconnectPeriod: 3000,
});

client.on('connect', () => {
  console.log('[bridge] ✅ Connected to HiveMQ broker');
  console.log('[bridge] LM Studio API Key detected:', !!LM_STUDIO_API_KEY, LM_STUDIO_API_KEY ? `(length: ${LM_STUDIO_API_KEY.length})` : '');
  client.subscribe(REQUEST_TOPIC, (err) => {
    if (err) console.error('[bridge] Subscribe error:', err);
    else console.log('[bridge] Subscribed to:', REQUEST_TOPIC);
    console.log('[bridge] 🚀 Ready! Waiting for messages from the browser...\n');
  });
});

client.on('message', async (topic, payload) => {
  if (topic !== REQUEST_TOPIC) return;

  let data;
  try {
    data = JSON.parse(payload.toString());
  } catch {
    console.error('[bridge] Invalid JSON in message');
    return;
  }

  const { id, message, config } = data;
  console.log(`[bridge] ← Received request [${id}]: "${message}"`);

  // Favor browser-provided config (for live updates from Account page), fallback to ENV
  const url = config?.url || LM_STUDIO_URL;
  const key = (config?.apiKey || LM_STUDIO_API_KEY || '').trim();
  const model = config?.model || LM_STUDIO_MODEL;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(key ? { 'Authorization': `Bearer ${key}` } : {}),
      },
      body: JSON.stringify({
        model: model,
        system_prompt: SYSTEM_PROMPT,
        input: message
      }),
    });

    if (!res.ok) throw new Error(`Local LLM HTTP ${res.status}: ${await res.text()}`);

    const json = await res.json();
    let text = json.output ?? json.choices?.[0]?.message?.content ?? json.content ?? 'No response from local model.';

    // If the API returned a structured object (e.g. {type: 'text', content: '...'}), extract the string
    if (typeof text === 'object' && text !== null) {
      text = text.content || text.text || JSON.stringify(text);
    }

    console.log(`[bridge] → Sending response [${id}]: "${String(text).slice(0, 80)}..."`);
    client.publish(RESPONSE_TOPIC, JSON.stringify({ id, text: String(text) }));
  } catch (err) {
    console.error('[bridge] ❌ Local LLM error:', err.message);
    client.publish(RESPONSE_TOPIC, JSON.stringify({ id, error: err.message }));
  }
});

client.on('error', (err) => console.error('[bridge] MQTT error:', err));
client.on('reconnect', () => console.log('[bridge] Reconnecting...'));
