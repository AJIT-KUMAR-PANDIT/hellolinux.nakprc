import type { Route } from "./+types/home";
import BottomNav from "~/components/Common/BottomNav";
import ChatScreen from "~/components/Chat/ChatScreen";
import VoiceScreen from "~/components/Voice/VoiceScreen";
import { useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Terminal / Console Interface" },
    { name: "description", content: "Terminal AI Interface" },
  ];
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("Terminal");

  return (
    <>
      {activeTab === "Terminal" && <ChatScreen />}
      {activeTab === "Voice" && <VoiceScreen />}
      {activeTab !== "Terminal" && activeTab !== "Voice" && (
        <div className="flex h-screen items-center justify-center text-gray-400 bg-[#0a0f18] pb-[88px] font-mono tracking-widest uppercase">
          {activeTab} module inactive
        </div>
      )}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
}
