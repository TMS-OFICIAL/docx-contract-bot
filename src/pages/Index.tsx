import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, FileText, CheckCircle, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-6xl w-full space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MessageSquare className="w-12 h-12 text-primary" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TM Contratos
              </h1>
            </div>
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
              Assistente inteligente para análise e gestão de contratos
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <FileText className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Análise Automática</CardTitle>
                <CardDescription>
                  Revise contratos automaticamente e identifique cláusulas importantes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-secondary/20 hover:border-secondary/40 transition-colors">
              <CardHeader>
                <CheckCircle className="w-10 h-10 text-secondary mb-2" />
                <CardTitle>Validação Inteligente</CardTitle>
                <CardDescription>
                  Verifique prazos, valores e condições contratuais com precisão
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-success/20 hover:border-success/40 transition-colors">
              <CardHeader>
                <Shield className="w-10 h-10 text-success mb-2" />
                <CardTitle>Gestão Segura</CardTitle>
                <CardDescription>
                  Armazene e gerencie seus documentos com segurança
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <Button
              size="lg"
              onClick={() => navigate("/chat")}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            >
              Iniciar Chat
            </Button>
            <p className="text-sm text-muted-foreground">
              Comece a analisar seus contratos agora mesmo
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <p>© 2024 TM Soluções Tecnológicas</p>
          <p>Assistente de Contratos v1.0</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
