
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { mockTags } from "../data/mockData";
import { Tag } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generateId } from "../lib/utils";
import { toast } from "@/hooks/use-toast";
import { TagsHeader } from "../components/TagsHeader";
import { TagsList } from "../components/TagsList";
import { TagForm } from "../components/TagForm";

const Tags = () => {
  const [tags, setTags] = useState<Tag[]>(mockTags);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [tagName, setTagName] = useState("");
  
  const handleAddTag = () => {
    setTagName("");
    setEditingTag(null);
    setIsDialogOpen(true);
  };
  
  const handleEditTag = (tag: Tag) => {
    setTagName(tag.name);
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
          ? { ...tag, name: tagName.trim() } 
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
        <TagsHeader onAddTag={handleAddTag} />
        
        <TagsList 
          tags={tags} 
          onEdit={handleEditTag} 
          onDelete={handleDeleteTag} 
          onAddTag={handleAddTag}
        />
        
        <Dialog open={isDialogOpen} onOpenChange={handleClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTag ? "Editar Tag" : "Nova Tag"}
              </DialogTitle>
            </DialogHeader>
            
            <TagForm 
              tagName={tagName}
              setTagName={setTagName}
              onSubmit={handleDialogSubmit}
              onClose={handleClose}
              isEditing={!!editingTag}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Tags;
