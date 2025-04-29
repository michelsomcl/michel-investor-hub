
// Update the Import statements to replace any tag color references
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { ClientLevel, Tag } from "../types";
import { mockClients, mockTags } from "../data/mockData";
import { Calendar, Clock, ListChecks, Tags, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Index = () => {
  const [totalClients, setTotalClients] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [clientsToday, setClientsToday] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [recentClients, setRecentClients] = useState(mockClients.slice(0, 5));
  
  useEffect(() => {
    // Count clients
    setTotalClients(mockClients.length);
    
    // Count leads
    setTotalLeads(mockClients.filter(client => client.level === "Lead").length);
    
    // Count clients added today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setClientsToday(mockClients.filter(client => {
      const clientDate = new Date(client.createdAt);
      clientDate.setHours(0, 0, 0, 0);
      return clientDate.getTime() === today.getTime();
    }).length);
    
    // Count pending tasks
    const totalPendingTasks = mockClients.reduce((total, client) => {
      return total + client.tasks.filter(task => !task.completed).length;
    }, 0);
    setPendingTasks(totalPendingTasks);
    
    // Sort clients by most recently added
    const sortedClients = [...mockClients].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setRecentClients(sortedClients.slice(0, 5));
  }, []);
  
  const renderSummaryCard = (
    title: string, 
    value: number | string,
    icon: React.ReactNode,
    color: string
  ) => (
    <Card className="border card-hover">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none text-muted-foreground">
              {title}
            </p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className={`p-2 rounded-full bg-${color}/10`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao sistema de controle de clientes.
          </p>
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {renderSummaryCard(
            "Total de Clientes",
            totalClients,
            <Users size={20} className="text-blue-600" />,
            "blue-600"
          )}
          {renderSummaryCard(
            "Total de Leads",
            totalLeads,
            <Users size={20} className="text-purple-600" />,
            "purple-600"
          )}
          {renderSummaryCard(
            "Novos Hoje",
            clientsToday,
            <Calendar size={20} className="text-green-600" />,
            "green-600"
          )}
          {renderSummaryCard(
            "Tarefas Pendentes",
            pendingTasks,
            <Clock size={20} className="text-orange-600" />,
            "orange-600"
          )}
        </div>
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="border card-hover">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Clientes Recentes</h2>
                <Link to="/clients" className="text-primary hover:underline text-sm">
                  Ver todos
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentClients.map(client => (
                  <div key={client.id} className="flex justify-between items-center p-3 bg-muted/40 rounded-md">
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {client.level === "Lead" ? "Lead" : "Cliente"}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {client.tags.map(tag => (
                        <Badge key={tag.id} className="bg-primary">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
                
                {recentClients.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Nenhum cliente cadastrado</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border card-hover">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tags</h2>
                <Link to="/tags" className="text-primary hover:underline text-sm">
                  Gerenciar
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {mockTags.map((tag) => (
                  <div key={tag.id} className="flex items-center">
                    <Badge className="bg-primary">
                      {tag.name}
                    </Badge>
                  </div>
                ))}
                
                {mockTags.length === 0 && (
                  <div className="text-center py-8 w-full">
                    <p className="text-muted-foreground">Nenhuma tag cadastrada</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
