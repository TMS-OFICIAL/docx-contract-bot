import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Info, FileText, Settings, Download, Trash2, BellOff, X } from "lucide-react";

interface ContextPanelProps {
  contactName: string;
  contactAvatar?: string;
  contactRole?: string;
  sharedFiles?: Array<{ id: string; name: string; type: string; url?: string }>;
  onClose?: () => void;
}

export default function ContextPanel({
  contactName,
  contactAvatar,
  contactRole = "AI Assistant",
  sharedFiles = [],
  onClose,
}: ContextPanelProps) {
  return (
    <div className="h-full bg-background border-l border-border flex flex-col" data-testid="context-panel">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold">Details</h3>
        <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-panel">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <Tabs defaultValue="info" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mx-4 mt-2">
          <TabsTrigger value="info" data-testid="tab-info">
            <Info className="w-4 h-4 mr-2" />
            Info
          </TabsTrigger>
          <TabsTrigger value="files" data-testid="tab-files">
            <FileText className="w-4 h-4 mr-2" />
            Files
          </TabsTrigger>
          <TabsTrigger value="settings" data-testid="tab-settings">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="info" className="p-4 space-y-6 mt-0">
            <div className="flex flex-col items-center text-center space-y-3">
              <Avatar className="w-20 h-20">
                <AvatarImage src={contactAvatar} alt={contactName} />
                <AvatarFallback className="text-2xl">{contactName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-lg" data-testid="text-contact-name">
                  {contactName}
                </h4>
                <p className="text-sm text-muted-foreground">{contactRole}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h5 className="font-medium text-sm">About</h5>
              <p className="text-sm text-muted-foreground">
                Your intelligent project management assistant. I can help analyze timelines, identify blockers,
                and provide insights to keep your projects on track.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h5 className="font-medium text-sm">Interaction Summary</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Messages</span>
                  <span className="font-medium">142</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Files Shared</span>
                  <span className="font-medium">{sharedFiles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">First Contact</span>
                  <span className="font-medium">2 weeks ago</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="files" className="p-4 space-y-4 mt-0">
            {sharedFiles.length > 0 ? (
              <div className="space-y-2">
                {sharedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-card hover-elevate"
                    data-testid={`file-${file.id}`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.type}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">No files shared yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="p-4 space-y-4 mt-0">
            <div className="space-y-3">
              <h5 className="font-medium text-sm">Conversation Settings</h5>
              <Button
                variant="outline"
                className="w-full justify-start"
                data-testid="button-mute"
                onClick={() => console.log("Mute notifications")}
              >
                <BellOff className="w-4 h-4 mr-2" />
                Mute Notifications
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                data-testid="button-export"
                onClick={() => console.log("Export conversation")}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Conversation
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <h5 className="font-medium text-sm text-destructive">Danger Zone</h5>
              <Button
                variant="destructive"
                className="w-full justify-start"
                data-testid="button-delete"
                onClick={() => console.log("Delete conversation")}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Conversation
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
