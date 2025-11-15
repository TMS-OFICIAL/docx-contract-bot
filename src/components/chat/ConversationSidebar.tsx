import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Settings } from "lucide-react";
import ConversationListItem from "./ConversationListItem";

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unread?: number;
}

interface ConversationSidebarProps {
  currentUser?: {
    name: string;
    avatar?: string;
  };
  conversations?: Conversation[];
  activeConversationId?: string;
  onConversationSelect?: (id: string) => void;
  onNewConversation?: () => void;
  onSettings?: () => void;
}

export default function ConversationSidebar({
  currentUser = { name: "User" },
  conversations = [],
  activeConversationId,
  onConversationSelect,
  onNewConversation,
  onSettings,
}: ConversationSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border" data-testid="conversation-sidebar">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-sm truncate" data-testid="text-user-name">
                {currentUser.name}
              </h2>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-status-online"></div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettings}
            data-testid="button-settings"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => (
            <ConversationListItem
              key={conv.id}
              {...conv}
              isActive={conv.id === activeConversationId}
              onClick={() => onConversationSelect?.(conv.id)}
            />
          ))
        ) : (
          <div className="text-center py-8 px-4">
            <p className="text-sm text-muted-foreground">
              {searchQuery ? "No conversations found" : "No conversations yet"}
            </p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          className="w-full"
          onClick={onNewConversation}
          data-testid="button-new-conversation"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Conversation
        </Button>
      </div>
    </div>
  );
}
