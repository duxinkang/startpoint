import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function DifyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Dify 智能助手</h1>
            <p className="text-muted-foreground">使用我们的 Dify 集成智能助手获取帮助和支持</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://udify.app/chatbot/ylKoweNTGVifhSNk" 
              style={{ width: '100%', height: '100%', minHeight: '700px' }} 
              frameBorder="0" 
              allow="microphone"
              title="Dify Chatbot"
            > 
            </iframe> 
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
