import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface ConversationListItemProps {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unread?: number;
  isActive?: boolean;
  onClick?: () => void;
}

export default function ConversationListItem({
  name,
  avatar,
  lastMessage,
  timestamp,
  unread,
  isActive,
  onClick,
}: ConversationListItemProps) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer hover-elevate active-elevate-2 ${
        isActive ? "bg-sidebar-accent" : ""
      }`}
      onClick={onClick}
      data-testid={`conversation-${name.toLowerCase().replace(/\s/g, "-")}`}
    >
      <Avatar className="w-10 h-10 flex-shrink-0">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-medium text-sm truncate" data-testid={`text-contact-name`}>
            {name}
          </h3>
          <span className="text-xs text-muted-foreground flex-shrink-0" data-testid="text-timestamp">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground truncate" data-testid="text-last-message">
            {lastMessage}
          </p>
          {unread && unread > 0 && (
            <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 flex-shrink-0" data-testid="badge-unread">
              {unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
