import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TypingIndicatorProps {
  senderName: string;
  senderAvatar?: string;
}

export default function TypingIndicator({ senderName, senderAvatar }: TypingIndicatorProps) {
  return (
    <div className="flex gap-3 mb-4" data-testid="typing-indicator">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={senderAvatar} alt={senderName} />
        <AvatarFallback>{senderName.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        <span className="text-xs text-muted-foreground mb-1">{senderName}</span>
        <div className="bg-card px-4 py-3 rounded-lg">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
