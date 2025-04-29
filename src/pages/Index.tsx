import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { ClientLevel, Tag, Client } from "../types";
import { Calendar, Clock, ListChecks, Tags, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { getClients, getTags, initializeLocalStorage } from "../services/localStorage";
import { ClientList } from "../components/ClientList";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [totalClients, setTotalClients] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [clientsToday, setClientsToday] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [recentClients, setRecentClients] = useState<Client[]>([]);
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterTitle, setFilterTitle] = useState<string>("");
  
  useEffect(() => {
    initializeLocalStorage();
    
    const clients = getClients();
    setAllClients(clients);
    
    setTotalClients(clients.length);
    
    setTotalLeads(clients.filter(client => client.level === "Lead").length);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setClientsToday(clients.filter(client => {
      const clientDate = new Date(client.createdAt);
      clientDate.setHours(0, 0, 0, 0);
      return clientDate.getTime() === today.getTime();
    }).length);
    
    const totalPendingTasks = clients.reduce((total, client) => {
      return total + client.tasks.filter(task => !task.completed).length;
    }, 0);
    setPendingTasks(totalPendingTasks);
    
    const sortedClients = [...clients].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setRecentClients(sortedClients.slice(0, 5));
  }, []);
  
  const renderSummaryCard = (
    title: string, 
    value: number | string,
    icon: React.ReactNode,
    color: string,
    filterKey: string
  ) => (
    <Card 
      className={`border card-hover cursor-pointer ${activeFilter === filterKey ? 'ring-2 ring-primary' : ''}`}
      onClick={() => handleCardClick(filterKey, title)}
    >
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

  const handleCardClick = (filterKey: string, title: string) => {
    if (activeFilter === filterKey) {
      setActiveFilter(null);
      setFilteredClients([]);
      setFilterTitle("");
      return;
    }

    setActiveFilter(filterKey);
    setFilterTitle(title);
    
    let filtered: Client[] = [];
    
    switch(filterKey) {
      case 'totalClients':
        filtered = [...allClients];
        break;
      case 'totalLeads':
        filtered = allClients.filter(client => client.level === 'Lead');
        break;
      case 'clientsToday':
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        filtered = allClients.filter(client => {
          const clientDate = new Date(client.createdAt);
          clientDate.setHours(0, 0, 0, 0);
          return clientDate.getTime() === today.getTime();
        });
        break;
      case 'pendingTasks':
        filtered = allClients.filter(client => 
          client.tasks.some(task => !task.completed)
        );
        break;
      default:
        filtered = [];
    }
    
    setFilteredClients(filtered);
  };

  const clearFilter = () => {
    setActiveFilter(null);
    setFilteredClients([]);
    setFilterTitle("");
  };
  
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
            "blue-600",
            "totalClients"
          )}
          {renderSummaryCard(
            "Total de Leads",
            totalLeads,
            <Users size={20} className="text-purple-600" />,
            "purple-600",
            "totalLeads"
          )}
          {renderSummaryCard(
            "Novos Hoje",
            clientsToday,
            <Calendar size={20} className="text-green-600" />,
            "green-600",
            "clientsToday"
          )}
          {renderSummaryCard(
            "Tarefas Pendentes",
            pendingTasks,
            <Clock size={20} className="text-orange-600" />,
            "orange-600",
            "pendingTasks"
          )}
        </div>

        <div className="flex justify-center space-x-4 my-6">
          <Button onClick={() => navigate('/calendar')} className="flex items-center gap-2">
            <Calendar size={16} />
            Ver Calendário
          </Button>
          <Button onClick={() => navigate('/tasks')} className="flex items-center gap-2">
            <ListChecks size={16} />
            Filtrar Tarefas
          </Button>
        </div>

        {activeFilter && (
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span>{filterTitle}</span>
                <Badge variant="outline" className="ml-2">
                  {filteredClients.length} {filteredClients.length === 1 ? 'resultado' : 'resultados'}
                </Badge>
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilter}
                className="text-sm flex items-center gap-1"
              >
                <X size={16} />
                Limpar filtro
              </Button>
            </div>
            
            <ClientList clients={filteredClients} />
          </div>
        )}
        
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
                  <div 
                    key={client.id} 
                    className="flex justify-between items-center p-3 bg-muted/40 rounded-md cursor-pointer hover:bg-muted"
                    onClick={() => navigate(`/clients/${client.id}`)}
                  >
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
                {getTags().map((tag) => (
                  <div key={tag.id} className="flex items-center">
                    <Badge className="bg-primary">
                      {tag.name}
                    </Badge>
                  </div>
                ))}
                
                {getTags().length === 0 && (
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
