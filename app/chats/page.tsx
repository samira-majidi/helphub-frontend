import IntegratedChatWidget from "@/widget/chat/IntegratedChatWidget";

export default function ChatsPage() {
  return (
    // کانتینر اصلی صفحه با ارتفاع دقیق صفحه نمایش
    <main className="w-full h-[100dvh] p-0 m-0 overflow-hidden bg-white">
      <IntegratedChatWidget />
    </main>
  );
}