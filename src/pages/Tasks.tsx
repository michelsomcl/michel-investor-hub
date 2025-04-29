
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Client, Task } from "../types";
import { getClients } from "../services/localStorage";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Check, Clock, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Tasks = () => {
  const [allTasks, setAllTasks] = useState<Array<Task & { clientName: string, clientId: string }>>([]);
  const [filteredTasks, setFilteredTasks] = useState<Array<Task & { clientName: string, clientId: string }>>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Load all tasks from all clients
    const clients = getClients();
    const tasks: Array<Task & { clientName: string, clientId: string }> = [];
    
    clients.forEach((client: Client) => {
      client.tasks.forEach(task => {
        tasks.push({
          ...task,
          clientName: client.name,
          clientId: client.id
        });
      });
    });
    
    setAllTasks(tasks);
    setFilteredTasks(tasks);
  }, []);
  
  useEffect(() => {
    // Apply filters
    let result = [...allTasks];
    
    // Filter by date
    if (selectedDate) {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      result = result.filter(task => {
        const taskDate = format(new Date(task.date), "yyyy-MM-dd");
        return taskDate === dateStr;
      });
    }
    
    // Filter by status
    if (selectedStatus) {
      if (selectedStatus === "completed") {
        result = result.filter(task => task.completed);
      } else if (selectedStatus === "pending") {
        result = result.filter(task => !task.completed);
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        task => task.title.toLowerCase().includes(query) || 
               task.description.toLowerCase().includes(query) ||
               task.clientName.toLowerCase().includes(query)
      );
    }
    
    setFilteredTasks(result);
  }, [selectedDate, selectedStatus, searchQuery, allTasks]);

  const clearFilters = () => {
    setSelectedDate(undefined);
    setSelectedStatus(undefined);
    setSearchQuery("");
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tarefas</h1>
          <Button variant="outline" onClick={clearFilters}>
            Limpar Filtros
          </Button>
        </div>
        
        <Card className="border">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium mb-1">Data</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Pesquisar</label>
                <Input 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar tarefas" 
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Lista de Tarefas</h2>
          
          {filteredTasks.length > 0 ? (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="border hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={task.completed ? "secondary" : "outline"} className="w-8 h-8 rounded-full p-1 flex items-center justify-center">
                          {task.completed ? (
                            <Check size={14} />
                          ) : (
                            <Clock size={14} />
                          )}
                        </Badge>
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="outline">
                          {format(new Date(task.date), "dd/MM/yyyy")}
                        </Badge>
                        <Link 
                          to={`/clients/${task.clientId}`} 
                          className="text-xs text-primary hover:underline"
                        >
                          Cliente: {task.clientName}
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border p-8 text-center">
              <p className="text-muted-foreground">Nenhuma tarefa encontrada com os filtros atuais.</p>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
