
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { ClientForm } from "../components/ClientForm";
import { mockTags } from "../data/mockData";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Client, Tag } from "../types";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const NewClient = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>(mockTags);
  
  const handleCreateClient = (client: Client) => {
    // In a real app, this would save to a database
    console.log("New client created:", client);
    
    // Navigate back to the clients list
    navigate("/clients");
    
    toast({
      title: "Cliente criado",
      description: `O cliente ${client.name} foi criado com sucesso.`
    });
  };
  
  const handleCreateTag = (tag: Tag) => {
    setTags(prevTags => [...prevTags, tag]);
  };

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
          
          <h1 className="text-2xl font-semibold">Novo Cliente</h1>
          <p className="text-muted-foreground">
            Preencha as informações para cadastrar um novo cliente
          </p>
        </div>
        
        <ClientForm
          availableTags={tags}
          onSubmit={handleCreateClient}
          onCreateTag={handleCreateTag}
        />
      </div>
    </Layout>
  );
};

export default NewClient;
