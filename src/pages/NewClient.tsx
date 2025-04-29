
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ClientForm } from "../components/ClientForm";
import { Client, Tag } from "../types";
import { mockClients, mockTags } from "../data/mockData";
import { toast } from "@/hooks/use-toast";

const NewClient = () => {
  const navigate = useNavigate();
  const [availableTags, setAvailableTags] = useState<Tag[]>(mockTags);

  const handleSubmit = (client: Client) => {
    // In a real app, this would send data to an API
    mockClients.push(client);
    
    toast({
      title: "Cliente adicionado",
      description: "O cliente foi adicionado com sucesso."
    });
    
    navigate("/clients");
  };
  
  const handleCreateTag = (tag: Tag) => {
    // In a real app, this would send data to an API
    mockTags.push(tag);
    setAvailableTags([...mockTags]);
    
    toast({
      title: "Tag criada",
      description: `A tag "${tag.name}" foi criada com sucesso.`
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Novo Cliente</h1>
          <p className="text-muted-foreground">
            Preencha as informações para cadastrar um novo cliente.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border">
          <ClientForm 
            availableTags={availableTags}
            onSubmit={handleSubmit}
            onCreateTag={handleCreateTag}
          />
        </div>
      </div>
    </Layout>
  );
};

export default NewClient;
