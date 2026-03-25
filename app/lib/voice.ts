/**
 * Web Speech API wrapper for TTS and STT
 */

// --- Speech-to-Text (STT) ---

export function getSpeechRecognition() {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) return null;
  
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  return recognition;
}

// --- Text-to-Speech (TTS) ---

export function speak(text: string, onEnd?: () => void) {
  if (!('speechSynthesis' in window)) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  
  if (onEnd) {
    utterance.onend = onEnd;
  }
  
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Strips markdown, code blocks, and internal thinking process from text 
 * to provide a cleaner, faster TTS experience.
 */
export function getCleanTextForSpeech(text: string): string {
  if (!text) return '';

  // 1. Remove [THINKING]: ... blocks (often at the start)
  // This handles both [THINKING]: and > [THINKING]: formats
  let cleanText = text.replace(/\[THINKING\]:[\s\S]*?(?=\n\n|$)/gi, '');
  cleanText = cleanText.replace(/>\s*\[THINKING\]:[\s\S]*?(?=\n\n|$)/gi, '');

  // 2. Remove code blocks entirely for speech
  cleanText = cleanText.replace(/```[\s\S]*?```/g, ' [Code block omitted] ');

  // 3. Strip basic markdown symbols but keep the words
  cleanText = cleanText
    .replace(/[#*`~]/g, '')           // Remove #, *, `, ~
    .replace(/_{1,2}(.*?)_{1,2}/g, '$1') // Remove underscores but keep content
    .replace(/!\[.*?\]\(.*?\)/g, '')   // Remove images
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Keep link text, remove URL
    .replace(/>+/g, '')               // Remove blockquote arrows
    .replace(/\s+/g, ' ')             // Normalize whitespace
    .trim();

  // 4. Truncate for "faster response" if still too long (e.g., 400 chars)
  // This ensures the AI gets to the point quickly when speaking.
  const MAX_LENGTH = 400;
  if (cleanText.length > MAX_LENGTH) {
    cleanText = cleanText.substring(0, MAX_LENGTH - 3) + '...';
  }

  return cleanText;
}
