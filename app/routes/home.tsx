import type { Route } from "./+types/home";
import BottomNav from "~/components/Common/BottomNav";
import ChatScreen, { type Message } from "~/components/Chat/ChatScreen";
import VoiceScreen from "~/components/Voice/VoiceScreen";
import LogsScreen from "~/components/Logs/LogsScreen";
import ConsoleScreen from "~/components/Console/ConsoleScreen";
import AccountScreen from "~/components/Account/AccountScreen";
import { useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Terminal / Console Interface" },
    { name: "description", content: "Terminal AI Interface" },
  ];
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("Terminal");
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: 'Console ready. How can I help you today?' }
  ]);

  return (
    <>
      {activeTab === "Terminal" && <ChatScreen messages={messages} setMessages={setMessages} />}
      {activeTab === "Voice" && <VoiceScreen setMessages={setMessages} />}
      {activeTab === "Logs" && <LogsScreen messages={messages} setMessages={setMessages} />}
      {activeTab === "Console" && <ConsoleScreen />}
      {activeTab === "Account" && <AccountScreen />}
      {activeTab !== "Terminal" && activeTab !== "Voice" && activeTab !== "Logs" && activeTab !== "Console" && activeTab !== "Account" && (
        <div className="flex h-screen items-center justify-center text-gray-400 bg-[#0a0f18] pb-[88px] font-mono tracking-widest uppercase">
          {activeTab} module inactive
        </div>
      )}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
}
