
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { ClientList } from "../components/ClientList";
import { SearchBar } from "../components/SearchBar";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { mockClients, mockTags } from "../data/mockData";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Client, Tag } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Clients = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [filteredClients, setFilteredClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedTagId, setSelectedTagId] = useState<string | null>(searchParams.get("tag") || null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  
  useEffect(() => {
    // Initial search/filter from URL
    const search = searchParams.get("search");
    const tagId = searchParams.get("tag");
    
    if (search) {
      setSearchTerm(search);
    }
    
    if (tagId) {
      setSelectedTagId(tagId);
    }
    
    applyFilters(search || "", tagId, selectedLevel);
  }, []);
  
  const applyFilters = (search: string, tagId: string | null, level: string | null) => {
    let filtered = [...clients];
    
    // Apply search filter
    if (search) {
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply tag filter
    if (tagId) {
      filtered = filtered.filter(client => 
        client.tags.some(tag => tag.id === tagId)
      );
    }
    
    // Apply level filter
    if (level) {
      filtered = filtered.filter(client => client.level === level);
    }
    
    setFilteredClients(filtered);
  };
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    // Update URL
    if (term) {
      searchParams.set("search", term);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
    
    applyFilters(term, selectedTagId, selectedLevel);
  };
  
  const handleTagChange = (tagId: string | null) => {
    setSelectedTagId(tagId);
    
    // Update URL
    if (tagId) {
      searchParams.set("tag", tagId);
    } else {
      searchParams.delete("tag");
    }
    setSearchParams(searchParams);
    
    applyFilters(searchTerm, tagId, selectedLevel);
  };
  
  const handleLevelChange = (level: string | null) => {
    setSelectedLevel(level);
    applyFilters(searchTerm, selectedTagId, level);
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTagId(null);
    setSelectedLevel(null);
    searchParams.delete("search");
    searchParams.delete("tag");
    setSearchParams(searchParams);
    setFilteredClients(clients);
  };
  
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Clientes</h1>
            <p className="text-muted-foreground">
              Gerencie seus clientes e leads
            </p>
          </div>
          
          <Button 
            className="btn-primary" 
            onClick={() => navigate("/clients/new")}
          >
            <Plus size={16} className="mr-2" />
            Novo Cliente
          </Button>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Buscar clientes por nome..."
              />
            </div>
            
            <div className="flex gap-2">
              <Select 
                value={selectedTagId || "all-tags"} 
                onValueChange={value => handleTagChange(value === "all-tags" ? null : value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filtrar por tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-tags">Todas as tags</SelectItem>
                  {mockTags.map(tag => (
                    <SelectItem key={tag.id} value={tag.id}>
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2 h-2 rounded-full bg-primary" 
                        />
                        {tag.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={selectedLevel || "all-levels"} 
                onValueChange={value => handleLevelChange(value === "all-levels" ? null : value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filtrar por nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-levels">Todos os níveis</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Cliente">Cliente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {(searchTerm || selectedTagId || selectedLevel) && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filtros ativos:</span>
              
              {searchTerm && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Busca: {searchTerm}
                </Badge>
              )}
              
              {selectedTagId && (
                <Badge className="bg-primary text-white">
                  {mockTags.find(t => t.id === selectedTagId)?.name}
                </Badge>
              )}
              
              {selectedLevel && (
                <Badge variant="outline">
                  Nível: {selectedLevel}
                </Badge>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-sm h-7"
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
        
        <div>
          <ClientList clients={filteredClients} />
        </div>
      </div>
    </Layout>
  );
};

export default Clients;
