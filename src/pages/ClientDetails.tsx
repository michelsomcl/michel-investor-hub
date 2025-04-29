
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { mockClients, mockTags } from "../data/mockData";
import { Button } from "@/components/ui/button";
import { ClientDetails as ClientDetailsComponent } from "../components/ClientDetails";
import { ClientForm } from "../components/ClientForm";
import { Client, ServiceHistory, Task, Tag } from "../types";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const ClientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [client, setClient] = useState<Client | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tags, setTags] = useState<Tag[]>(mockTags);
  
  useEffect(() => {
    // Find client with the given ID
    const foundClient = mockClients.find(c => c.id === id);
    
    if (foundClient) {
      setClient(foundClient);
    } else {
      navigate("/clients", { replace: true });
      toast({
        title: "Cliente não encontrado",
        description: "O cliente solicitado não foi encontrado.",
        variant: "destructive"
      });
    }
  }, [id, navigate]);
  
  const handleServiceHistoryAdd = (history: ServiceHistory) => {
    if (!client) return;
    
    const updatedClient = {
      ...client,
      serviceHistory: [...client.serviceHistory, history],
      updatedAt: new Date()
    };
    
    setClient(updatedClient);
    
    toast({
      title: "Atendimento registrado",
      description: "O histórico de atendimento foi atualizado com sucesso."
    });
  };
  
  const handleTaskAdd = (task: Task) => {
    if (!client) return;
    
    const updatedClient = {
      ...client,
      tasks: [...client.tasks, task],
      updatedAt: new Date()
    };
    
    setClient(updatedClient);
    
    toast({
      title: "Tarefa adicionada",
      description: "A nova tarefa foi adicionada com sucesso."
    });
  };
  
  const handleTaskComplete = (taskId: string, completed: boolean) => {
    if (!client) return;
    
    const updatedTasks = client.tasks.map(task => 
      task.id === taskId ? { ...task, completed } : task
    );
    
    const updatedClient = {
      ...client,
      tasks: updatedTasks,
      updatedAt: new Date()
    };
    
    setClient(updatedClient);
    
    toast({
      title: completed ? "Tarefa concluída" : "Tarefa reaberta",
      description: completed 
        ? "A tarefa foi marcada como concluída." 
        : "A tarefa foi marcada como pendente."
    });
  };
  
  const handleClientUpdate = (updatedClient: Client) => {
    setClient(updatedClient);
    setIsEditing(false);
    
    toast({
      title: "Cliente atualizado",
      description: "As informações do cliente foram atualizadas com sucesso."
    });
  };
  
  const handleTagCreate = (newTag: Tag) => {
    setTags(prevTags => [...prevTags, newTag]);
  };
  
  if (!client) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Carregando informações do cliente...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/clients")}
            className="flex items-center gap-1 mb-4"
          >
            <ArrowLeft size={16} />
            Voltar para a lista de clientes
          </Button>
        </div>
        
        {isEditing ? (
          <>
            <h1 className="text-2xl font-semibold">Editar Cliente</h1>
            
            <ClientForm 
              client={client}
              availableTags={tags}
              onSubmit={handleClientUpdate}
              onCreateTag={handleTagCreate}
            />
            
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
            </div>
          </>
        ) : (
          <ClientDetailsComponent 
            client={client}
            availableTags={tags}
            onServiceHistoryAdd={handleServiceHistoryAdd}
            onTaskAdd={handleTaskAdd}
            onTaskComplete={handleTaskComplete}
            onEditClick={() => setIsEditing(true)}
          />
        )}
      </div>
    </Layout>
  );
};

export default ClientDetailsPage;
