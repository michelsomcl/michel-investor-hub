
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { mockTags } from "../data/mockData";
import { Tag } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash } from "lucide-react";
import { formatDate, generateId, getRandomColor } from "../lib/utils";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const Tags = () => {
  const [tags, setTags] = useState<Tag[]>(mockTags);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState(getRandomColor());
  
  const handleAddTag = () => {
    setTagName("");
    setTagColor(getRandomColor());
    setEditingTag(null);
    setIsDialogOpen(true);
  };
  
  const handleEditTag = (tag: Tag) => {
    setTagName(tag.name);
    setTagColor(tag.color);
    setEditingTag(tag);
    setIsDialogOpen(true);
  };
  
  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
    
    toast({
      title: "Tag excluída",
      description: "A tag foi removida com sucesso."
    });
  };
  
  const handleDialogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tagName.trim()) return;
    
    if (editingTag) {
      // Update existing tag
      setTags(tags.map(tag => 
        tag.id === editingTag.id 
          ? { ...tag, name: tagName.trim(), color: tagColor } 
          : tag
      ));
      
      toast({
        title: "Tag atualizada",
        description: `A tag "${tagName}" foi atualizada com sucesso.`
      });
    } else {
      // Create new tag
      const newTag: Tag = {
        id: generateId(),
        name: tagName.trim(),
        color: tagColor,
        createdAt: new Date()
      };
      
      setTags([...tags, newTag]);
      
      toast({
        title: "Tag criada",
        description: `A tag "${tagName}" foi criada com sucesso.`
      });
    }
    
    setIsDialogOpen(false);
  };
  
  const handleClose = () => {
    setIsDialogOpen(false);
    setEditingTag(null);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Tags</h1>
            <p className="text-muted-foreground">
              Gerencie as tags para categorizar seus clientes
            </p>
          </div>
          
          <Button 
            className="btn-primary" 
            onClick={handleAddTag}
          >
            <Plus size={16} className="mr-2" />
            Nova Tag
          </Button>
        </div>
        
        {tags.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Nenhuma tag cadastrada</p>
            <Button 
              className="mt-4 btn-primary" 
              onClick={handleAddTag}
            >
              <Plus size={16} className="mr-2" />
              Criar Tag
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tags.map(tag => (
              <Card key={tag.id} className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge 
                      className="text-white py-1 px-3 text-sm"
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.name}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditTag(tag)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTag(tag.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Criada em: {formatDate(tag.createdAt)}
                  </p>
                  <div className="mt-2">
                    <div 
                      className="w-full h-6 rounded-md" 
                      style={{ backgroundColor: tag.color }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <Dialog open={isDialogOpen} onOpenChange={handleClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTag ? "Editar Tag" : "Nova Tag"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleDialogSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tagName">Nome da Tag</Label>
                <Input
                  id="tagName"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  placeholder="Ex: VIP, Ativo, Aposentado..."
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tagColor">Cor</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="color"
                    id="tagColor"
                    value={tagColor}
                    onChange={(e) => setTagColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <div 
                    className="flex-1 h-10 rounded-md border"
                    style={{ backgroundColor: tagColor }}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button type="submit" className="btn-primary">
                  {editingTag ? "Atualizar" : "Salvar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Tags;
