import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Smile, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSend?: (message: string) => void;
  placeholder?: string;
}

export default function ChatInput({ onSend, placeholder = "Type a message..." }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      onSend?.(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-border" data-testid="chat-input">
      <div className="flex items-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0"
          data-testid="button-emoji"
          onClick={() => console.log("Emoji picker")}
        >
          <Smile className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0"
          data-testid="button-attach"
          onClick={() => console.log("Attach file")}
        >
          <Paperclip className="w-5 h-5" />
        </Button>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="resize-none min-h-[40px] max-h-[120px]"
          rows={1}
          data-testid="input-message"
        />
        <Button
          onClick={handleSend}
          size="icon"
          className="flex-shrink-0"
          disabled={!message.trim()}
          data-testid="button-send"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
