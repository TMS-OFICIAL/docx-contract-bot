import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, X, Archive, Bell, BellOff } from "lucide-react";

interface ChatHeaderProps {
  contactName: string;
  contactAvatar?: string;
  status?: string;
  onClose?: () => void;
}

export default function ChatHeader({ contactName, contactAvatar, status, onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border" data-testid="chat-header">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={contactAvatar} alt={contactName} />
          <AvatarFallback>{contactName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-base" data-testid="text-contact-name">
            {contactName}
          </h2>
          {status && (
            <p className="text-xs text-muted-foreground" data-testid="text-status">
              {status}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" data-testid="button-menu">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem data-testid="menu-mute">
              <BellOff className="w-4 h-4 mr-2" />
              Mute notifications
            </DropdownMenuItem>
            <DropdownMenuItem data-testid="menu-archive">
              <Archive className="w-4 h-4 mr-2" />
              Archive conversation
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" data-testid="menu-delete">
              <X className="w-4 h-4 mr-2" />
              Delete conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
