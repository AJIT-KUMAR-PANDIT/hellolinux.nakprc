ocal LLM via MQTT — Implementation Plan
Goal
Connect the chat interface to a local LLM (e.g. LM Studio running on port 1234) using MQTT as a message bus — and auto-fall back to Gemini if the local model is unreachable.

IMPORTANT

How this works:

A small Node.js bridge script (
local-mqtt-bridge.js
) runs on your laptop alongside LM Studio. It subscribes to MQTT topic hellolinux/ai/request and publishes responses back on hellolinux/ai/response.
The browser connects to the same public MQTT broker over WebSockets, sends the user's message to the broker, and waits for the response.
If no local response arrives within 5 seconds, it falls back to Gemini automatically.
WARNING

This uses the free public HiveMQ broker (wss://broker.hivemq.com:8884). Messages are not encrypted. Do not send private data. For production, use a self-hosted broker (Mosquitto) or add TLS.

Proposed Changes
Local Bridge Script (runs on your laptop)
[NEW] 
local-mqtt-bridge.js
Node.js script that acts as the bridge between MQTT and your local LM Studio HTTP API.
Subscribes to hellolinux/ai/request.
Forwards prompts to http://localhost:1234/v1/chat/completions.
Publishes responses back to hellolinux/ai/response.
Frontend API Layer
[NEW] 
llm-local.ts
Browser-side MQTT client (using mqtt package over WebSockets).
Exports 
generateLocalLLMResponse(message)
 that publishes to the broker and awaits the response topic with a 5s timeout.
[MODIFY] 
llm.ts
generateAIResponse()
 tries local MQTT first, then falls back to Gemini.
[NEW] Markdown & Code Highlighting
We will now support rendering the AI's responses using react-markdown and react-syntax-highlighter. This will allow for:

Formatted text: Bold, italics, lists, and links.
Syntax Highlighting: Beautiful code blocks for various languages.
Copy to Clipboard: A "Copy" button for each code block.
Reasoning Display: Handing the bridge's reasoning + message format.
[MODIFY] 
local-mqtt-bridge.cjs
Update response parsing: If it's an array of {type, content}, combine them with a special ---THOUGHT--- separator.
[MODIFY] 
MessageBubble.tsx
Use react-markdown for rendering.
Implement custom components for code and pre to add syntax highlighting and the copy button.
Parse and style the reasoning text as a "Thinking..." block.
Verification Plan
Ask the AI a programming question (e.g. "How do I list files in Python?").
Verify the code block is highlighted.
Test the "Copy" button on the code block.
Verify any reasoning/thought process is displayed in a distinct style.
