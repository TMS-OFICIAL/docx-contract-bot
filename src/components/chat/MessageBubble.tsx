import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, CheckCheck } from "lucide-react";
import { format } from "date-fns";

interface MessageBubbleProps {
  content: string;
  timestamp: Date;
  isUser: boolean;
  senderName?: string;
  senderAvatar?: string;
  status?: "sent" | "delivered" | "read";
}

export default function MessageBubble({
  content,
  timestamp,
  isUser,
  senderName,
  senderAvatar,
  status,
}: MessageBubbleProps) {
  return (
    <div
      className={`flex gap-3 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      data-testid={`message-${isUser ? "user" : "agent"}`}
    >
      {!isUser && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={senderAvatar} alt={senderName} />
          <AvatarFallback>{senderName?.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[70%]`}>
        {!isUser && senderName && (
          <span className="text-xs text-muted-foreground mb-1">{senderName}</span>
        )}
        <div
          className={`px-4 py-2 rounded-lg ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-card text-card-foreground"
          }`}
          data-testid="text-message-content"
        >
          <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        </div>
        <div className={`flex items-center gap-1 mt-1 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <span className="text-xs text-muted-foreground" data-testid="text-message-time">
            {format(timestamp, "HH:mm")}
          </span>
          {isUser && status && (
            <div data-testid={`status-${status}`}>
              {status === "sent" && <Check className="w-3 h-3 text-muted-foreground" />}
              {status === "delivered" && <CheckCheck className="w-3 h-3 text-muted-foreground" />}
              {status === "read" && <CheckCheck className="w-3 h-3 text-primary" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
