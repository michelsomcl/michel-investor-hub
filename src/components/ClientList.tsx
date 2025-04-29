
import React from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPhoneNumber } from "../lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
