import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Eye, EyeOff, Cpu, Cloud, ChevronDown, ChevronUp, User, Volume2 } from 'lucide-react';
import { useAISettingsStore, type AIProvider } from '~/store/useAISettingsStore';

// Reusable input field component
function SettingField({
  label, value, onChange, placeholder, type = 'text', hint
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; hint?: string;
}) {
  const [show, setShow] = useState(type !== 'password');
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
      <div className="relative flex items-center">
        <input
          type={type === 'password' ? (show ? 'text' : 'password') : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#0a0f18] border border-white/10 rounded-xl px-4 py-3 text-base text-gray-200 placeholder-gray-600 outline-none focus:border-green-500/50 transition-colors font-mono pr-10"
        />
        {type === 'password' && (
          <button onClick={() => setShow(s => !s)} className="absolute right-3 text-gray-500 hover:text-gray-300">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {hint && <p className="text-xs text-gray-600">{hint}</p>}
    </div>
  );
}

// Toggle switch component
function ProviderToggle({ provider, onChange }: { provider: AIProvider; onChange: (p: AIProvider) => void }) {
  return (
    <div className="flex w-full rounded-2xl bg-[#0a0f18] border border-white/5 p-1 gap-1">
      {(['gemini', 'local'] as AIProvider[]).map((p) => (
        <motion.button
          key={p}
          onClick={() => onChange(p)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 ${provider === p ? 'bg-[#1a2a1a] text-green-400 shadow-inner shadow-green-500/10' : 'text-gray-500 hover:text-gray-300'}`}
        >
          {p === 'gemini' ? <Cloud size={16} /> : <Cpu size={16} />}
          {p === 'gemini' ? 'Google Gemini' : 'Local LLM (MQTT)'}
        </motion.button>
      ))}
    </div>
  );
}

// Expandable section
function Section({ title, icon, children, defaultOpen = true }: {
  title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl bg-[#10141a]/60 border border-white/5 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3 text-sm font-semibold text-gray-300">
          <span className="text-green-400">{icon}</span>
          {title}
        </div>
        {open ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
            <div className="px-5 pb-5 flex flex-col gap-4 border-t border-white/5 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AccountScreen() {
  const s = useAISettingsStore();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col h-[100%] w-full bg-[#0a0f18] text-gray-100 mb-18">
      {/* Header */}
      <header className="flex-none px-6 py-5 border-b border-white/5 bg-[#10141a]/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <User size={20} className="text-green-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-100">Account &amp; Settings</h1>
            <p className="text-xs text-gray-500 font-mono">Hello Linux — NAKPRC</p>
          </div>
        </div>
      </header>

      {/* Scrollable content */}
      <main className="flex-1 px-4 sm:px-6 py-6 pb-28 flex flex-col gap-5 max-w-2xl mx-auto w-full">

        {/* AI Provider Toggle */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active AI Provider</p>
          <ProviderToggle provider={s.provider} onChange={s.setProvider} />
          <p className="text-xs text-gray-600 text-center">
            {s.provider === 'gemini'
              ? 'All messages go to Google Gemini API'
              : 'Messages go to your local LLM via MQTT. Falls back to Gemini if unavailable.'}
          </p>
        </div>

        {/* Voice Config */}
        <Section title="Voice & Accessibility" icon={<Volume2 size={16} />}>
          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-gray-200">Auto Read AI Responses</span>
              <span className="text-xs text-gray-500">AI will automatically speak its response aloud</span>
            </div>
            <button
              onClick={() => s.setAutoTTS(!s.autoTTS)}
              className={`w-12 h-6 rounded-full transition-colors relative ${s.autoTTS ? 'bg-green-500' : 'bg-gray-800'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${s.autoTTS ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-white/5 pt-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-gray-200">Enable Voice Input (STT)</span>
              <span className="text-xs text-gray-500">Enable microphone button in Voice tab</span>
            </div>
            <button
              onClick={() => s.setSTTEnabled(!s.sttEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${s.sttEnabled ? 'bg-green-500' : 'bg-gray-800'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${s.sttEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </Section>

        {/* Gemini Config */}
        <Section title="Google Gemini" icon={<Cloud size={16} />}>
          <SettingField
            label="Gemini API Key"
            type="password"
            value={s.geminiApiKey}
            onChange={s.setGeminiApiKey}
            placeholder="AIzaSy..."
            hint="Get your key from aistudio.google.com"
          />
          <SettingField
            label="Model"
            value={s.geminiModel}
            onChange={s.setGeminiModel}
            placeholder="gemini-2.0-flash-lite"
            hint="e.g. gemini-2.0-flash-lite, gemini-1.5-pro"
          />
        </Section>

        {/* Local LLM Config */}
        <Section title="Local LLM (LM Studio)" icon={<Cpu size={16} />} defaultOpen={s.provider === 'local'}>
          <SettingField
            label="LM Studio API URL"
            value={s.localLLMUrl}
            onChange={s.setLocalLLMUrl}
            placeholder="http://localhost:1234/v1/chat/completions"
          />
          <SettingField
            label="LM Studio API Key"
            type="password"
            value={s.localLLMApiKey}
            onChange={s.setLocalLLMApiKey}
            placeholder="sk-lm-..."
            hint="Found in LM Studio → Local Server → API Key"
          />
          <SettingField
            label="Model Name"
            value={s.localLLMModel}
            onChange={s.setLocalLLMModel}
            placeholder="local-model"
            hint="Match the exact model identifier shown in LM Studio"
          />
        </Section>

        {/* MQTT Config */}
        <Section title="MQTT Broker (Bridge Config)" icon={<span className="font-mono text-[11px] text-green-400">MQTT</span>} defaultOpen={false}>
          <SettingField label="Broker WebSocket URL" value={s.mqttBrokerUrl} onChange={s.setMqttBrokerUrl} placeholder="wss://broker.hivemq.com:8884/mqtt" />
          <SettingField label="Request Topic" value={s.mqttRequestTopic} onChange={s.setMqttRequestTopic} />
          <SettingField label="Response Topic" value={s.mqttResponseTopic} onChange={s.setMqttResponseTopic} />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Timeout (ms)</label>
            <input
              type="number"
              value={s.mqttTimeoutMs}
              onChange={(e) => s.setMqttTimeoutMs(Number(e.target.value))}
              className="w-full bg-[#0a0f18] border border-white/10 rounded-xl px-4 py-3 text-base text-gray-200 outline-none focus:border-green-500/50 transition-colors font-mono"
            />
          </div>
        </Section>

        {/* Save button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleSave}
          className={`fixed bottom-21 w-full flex items-center justify-center self-center gap-2 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 ${saved ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-500 text-white hover:bg-green-400'}`}
        >
          <Save size={18} />
          {saved ? '✅ Settings Saved!' : 'Save Settings'}
        </motion.button>

      </main>
    </div>
  );
}
