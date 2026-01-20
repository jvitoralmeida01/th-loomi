import ChatStoreProvider from "@/app/(authenticated)/chat/_store/ChatStoreProvider";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChatStoreProvider>{children}</ChatStoreProvider>;
}
