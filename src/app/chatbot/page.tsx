import { ChatBot } from "@/UI";


export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1>Landing Page</h1>
        <ChatBot />
        <p>Welcome to the landing page!</p><div></div>
      
        {/* Filler content to enable scrolling */}
        <div className="h-[2000px]"></div>
      </main>
  );
}
