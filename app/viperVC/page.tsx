import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Brain, Zap, MessageSquare, Sparkles } from "lucide-react";

export default function DifyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full mb-6 animate-pulse">
              <Brain className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              毒舌点评agent
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              小嘴跟淬了毒似的
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">死因诊断书</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">降维打击</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">PMF 压力测试针</span>
              </div>
            </div>
          </div>
          <div className="border border-border rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
            <iframe 
              src="https://udify.app/chatbot/ylKoweNTGVifhSNk" 
              style={{ width: '100%', height: '100%', minHeight: '700px' }} 
              frameBorder="0" 
              allow="microphone"
              title="Smart Agent Chatbot"
            > 
            </iframe> 
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
