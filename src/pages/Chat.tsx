import { useState } from "react";
import ConversationSidebar from "@/components/chat/ConversationSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageBubble from "@/components/chat/MessageBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import ChatInput from "@/components/chat/ChatInput";
import ContextPanel from "@/components/chat/ContextPanel";
import { FileText } from "lucide-react";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
  status?: "sent" | "delivered" | "read";
}

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unread?: number;
}

const Chat = () => {
  const [showContextPanel, setShowContextPanel] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeConversation, setActiveConversation] = useState("1");

  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "Assistente de Contratos",
      lastMessage: "Como posso ajudar você com seus contratos hoje?",
      timestamp: new Date(Date.now() - 5 * 60000),
      unread: 0,
    },
    {
      id: "2",
      name: "Análise de Cláusulas",
      lastMessage: "Revisão de contrato de prestação de serviços concluída.",
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      unread: 0,
    },
    {
      id: "3",
      name: "Gestão de Documentos",
      lastMessage: "3 novos contratos adicionados ao sistema.",
      timestamp: new Date(Date.now() - 24 * 60 * 60000),
      unread: 2,
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Sou seu assistente especializado em contratos. Como posso ajudá-lo hoje?",
      timestamp: new Date(Date.now() - 10 * 60000),
      isUser: false,
      status: "read",
    },
    {
      id: "2",
      content: "Preciso revisar um contrato de prestação de serviços.",
      timestamp: new Date(Date.now() - 8 * 60000),
      isUser: true,
      status: "read",
    },
    {
      id: "3",
      content: "Perfeito! Posso ajudá-lo com isso. Por favor, envie o contrato ou me forneça os detalhes principais que precisa revisar. Posso verificar:\n\n• Cláusulas contratuais\n• Prazos e condições\n• Valores e formas de pagamento\n• Responsabilidades das partes\n• Cláusulas de rescisão",
      timestamp: new Date(Date.now() - 7 * 60000),
      isUser: false,
      status: "read",
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: String(messages.length + 1),
      content,
      timestamp: new Date(),
      isUser: true,
      status: "sent",
    };

    setMessages([...messages, newMessage]);
    setIsTyping(true);

    // Simular resposta do assistente
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: String(messages.length + 2),
        content: "Entendi sua solicitação. Vou analisar as informações do contrato e fornecer uma revisão detalhada. Aguarde um momento...",
        timestamp: new Date(),
        isUser: false,
        status: "read",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 2000);
  };

  const currentUser = {
    name: "Usuário TM",
    avatar: undefined,
  };

  const activeConv = conversations.find((c) => c.id === activeConversation);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 flex-shrink-0">
        <ConversationSidebar
          currentUser={currentUser}
          conversations={conversations}
          activeConversationId={activeConversation}
          onConversationSelect={setActiveConversation}
          onNewConversation={() => console.log("Nova conversa")}
          onSettings={() => console.log("Configurações")}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader
          contactName={activeConv?.name || "Chat"}
          status="Online"
          onClose={() => setShowContextPanel(!showContextPanel)}
        />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="flex items-center justify-center py-4">
            <div className="bg-card px-4 py-2 rounded-full text-sm text-muted-foreground border border-border">
              Hoje
            </div>
          </div>

          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              content={message.content}
              timestamp={message.timestamp}
              isUser={message.isUser}
              senderName={message.isUser ? undefined : activeConv?.name}
              status={message.status}
            />
          ))}

          {isTyping && (
            <TypingIndicator
              senderName={activeConv?.name || "Assistente"}
            />
          )}
        </div>

        {/* Input */}
        <ChatInput
          onSend={handleSendMessage}
          placeholder="Digite sua mensagem sobre contratos..."
        />
      </div>

      {/* Context Panel */}
      {showContextPanel && (
        <div className="w-80 flex-shrink-0">
          <ContextPanel
            contactName={activeConv?.name || "Chat"}
            contactRole="Assistente de IA"
            sharedFiles={[
              {
                id: "1",
                name: "Contrato_Prestacao_Servicos.pdf",
                type: "PDF",
              },
              {
                id: "2",
                name: "Clausulas_Revisadas.docx",
                type: "DOCX",
              },
            ]}
            onClose={() => setShowContextPanel(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
