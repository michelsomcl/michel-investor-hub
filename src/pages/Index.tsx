
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockClients, mockTags } from "../data/mockData";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { Button } from "@/components/ui/button";
import { Plus, Users, Tag, CheckSquare } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Count stats
  const totalClients = mockClients.length;
  const totalLeads = mockClients.filter(client => client.level === "Lead").length;
  const totalCustomers = mockClients.filter(client => client.level === "Cliente").length;
  
  const totalTasks = mockClients.reduce(
    (acc, client) => acc + client.tasks.length, 
    0
  );
  
  const pendingTasks = mockClients.reduce(
    (acc, client) => acc + client.tasks.filter(task => !task.completed).length, 
    0
  );

  // Recent clients
  const recentClients = [...mockClients]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo ao Controle de Clientes Michel
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              className="btn-primary" 
              onClick={() => navigate("/clients/new")}
            >
              <Plus size={16} className="mr-2" />
              Novo Cliente
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Clientes
              </CardTitle>
              <Users size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClients}</div>
              <p className="text-xs text-muted-foreground">
                {totalLeads} leads, {totalCustomers} clientes
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Tags
              </CardTitle>
              <Tag size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockTags.length}</div>
              <p className="text-xs text-muted-foreground">
                Gerenciamento de categorias
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Tarefas Pendentes
              </CardTitle>
              <CheckSquare size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTasks}</div>
              <p className="text-xs text-muted-foreground">
                De um total de {totalTasks} tarefas
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Atendimentos
              </CardTitle>
              <Users size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockClients.reduce((acc, client) => acc + client.serviceHistory.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Histórico de interações
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Clientes Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0 cursor-pointer"
                    onClick={() => navigate(`/clients/${client.id}`)}
                  >
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground">{client.phone}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(client.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/clients")}
                >
                  Ver Todos os Clientes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Busca Rápida</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SearchBar
                onSearch={(term) => {
                  if (term.trim()) {
                    navigate(`/clients?search=${encodeURIComponent(term)}`);
                  }
                }}
                placeholder="Buscar por nome do cliente..."
              />
              
              <div>
                <p className="text-sm font-medium mb-2">Tags Populares</p>
                <div className="flex flex-wrap gap-2">
                  {mockTags.map((tag) => (
                    <div
                      key={tag.id}
                      onClick={() => navigate(`/clients?tag=${tag.id}`)}
                      style={{ backgroundColor: tag.color }}
                      className="text-white text-xs rounded-full px-3 py-1 cursor-pointer"
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
