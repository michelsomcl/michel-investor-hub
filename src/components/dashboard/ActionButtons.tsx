
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ListChecks } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ActionButtons = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};
