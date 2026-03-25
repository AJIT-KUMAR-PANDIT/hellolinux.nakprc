import type { Route } from "./+types/home";
import BottomNav from "~/components/Common/BottomNav";
import ChatScreen from "~/components/Chat/ChatScreen";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Terminal / Console Interface" },
    { name: "description", content: "Terminal AI Interface" },
  ];
}

export default function Home() {
  return (
    <>
      <ChatScreen />
      <BottomNav />
    </>
  );
}
