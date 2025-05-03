
import React from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPhoneNumber } from "../lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getClients, saveClients } from "../services/localStorage";

interface ClientListProps {
  clients: Client[];
}

export const ClientList = ({ clients }: ClientListProps) => {
  const navigate = useNavigate();

  const handleDeleteClient = (clientId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    // Get current clients and filter out the one to delete
    const currentClients = getClients();
    const updatedClients = currentClients.filter(client => client.id !== clientId);
    
    // Save updated clients list to localStorage
    saveClients(updatedClients);
    
    // Show confirmation toast
    toast({
      title: "Cliente excluído",
      description: "O cliente foi excluído com sucesso."
    });
    
    // Force a page reload to refresh the client list
    window.location.reload();
  };

  // Sort clients alphabetically by name
  const sortedClients = [...clients].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  if (sortedClients.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Nenhum cliente encontrado</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Nível</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Fonte</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Cadastro</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedClients.map((client) => (
            <TableRow 
              key={client.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => navigate(`/clients/${client.id}`)}
            >
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>
                <Badge variant={client.level === "Cliente" ? "default" : "outline"}>
                  {client.level}
                </Badge>
              </TableCell>
              <TableCell>{formatPhoneNumber(client.phone)}</TableCell>
              <TableCell>{client.source}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {client.tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="text-xs">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {client.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive cursor-pointer"
                      onClick={(e) => handleDeleteClient(client.id, e)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
