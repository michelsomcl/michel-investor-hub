
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { ClientList } from "../components/ClientList";
import { mockClients, mockTags } from "../data/mockData";
import { useSearchParams } from "react-router-dom";
import { ClientsHeader } from "../components/ClientsHeader";
import { ClientFilters } from "../components/ClientFilters";
import { useClientFilters } from "../hooks/useClientFilters";

const Clients = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [clients] = useState(mockClients);
  
  const {
    filteredClients,
    searchTerm,
    selectedTagId,
    selectedLevel,
    handleSearch,
    handleTagChange,
    handleLevelChange,
    clearFilters
  } = useClientFilters(
    clients, 
    searchParams.get("search"), 
    searchParams.get("tag")
  );
  
  const onSearch = (term: string) => {
    const newTerm = handleSearch(term);
    
    // Update URL
    if (newTerm) {
      searchParams.set("search", newTerm);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };
  
  const onTagChange = (tagId: string | null) => {
    const newTagId = handleTagChange(tagId);
    
    // Update URL
    if (newTagId) {
      searchParams.set("tag", newTagId);
    } else {
      searchParams.delete("tag");
    }
    setSearchParams(searchParams);
  };
  
  const onClearFilters = () => {
    clearFilters();
    searchParams.delete("search");
    searchParams.delete("tag");
    setSearchParams(searchParams);
  };
  
  return (
    <Layout>
      <div className="space-y-8">
        <ClientsHeader />
        
        <ClientFilters
          searchTerm={searchTerm}
          selectedTagId={selectedTagId}
          selectedLevel={selectedLevel}
          tags={mockTags}
          onSearch={onSearch}
          onTagChange={onTagChange}
          onLevelChange={handleLevelChange}
          clearFilters={onClearFilters}
        />
        
        <div>
          <ClientList clients={filteredClients} />
        </div>
      </div>
    </Layout>
  );
};

export default Clients;
