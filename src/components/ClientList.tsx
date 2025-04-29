
import React from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPhoneNumber } from "../lib/utils";

interface ClientListProps {
  clients: Client[];
}

export const ClientList = ({ clients }: ClientListProps) => {
  const navigate = useNavigate();

  if (clients.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Nenhum cliente encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client) => (
        <Card 
          key={client.id} 
          className="card-hover cursor-pointer" 
          onClick={() => navigate(`/clients/${client.id}`)}
        >
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-lg truncate">{client.name}</h3>
                <Badge variant={client.level === "Cliente" ? "default" : "outline"}>
                  {client.level}
                </Badge>
              </div>
              
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>📱 {formatPhoneNumber(client.phone)}</p>
                <p>📊 Fonte: {client.source}</p>
              </div>
              
              {client.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {client.tags.map((tag) => (
                    <Badge 
                      key={tag.id} 
                      style={{backgroundColor: tag.color}}
                      className="text-white"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="text-xs text-muted-foreground pt-2">
                <p>Cadastrado em: {client.createdAt.toLocaleDateString()}</p>
                <div className="flex justify-between items-center mt-1">
                  <p>{client.serviceHistory.length} atendimentos</p>
                  <p>{client.tasks.filter(t => !t.completed).length} tarefas pendentes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
