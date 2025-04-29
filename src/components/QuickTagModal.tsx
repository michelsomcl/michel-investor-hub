
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tag } from "../types";
import { generateId } from "../lib/utils";
import { TagForm } from "./TagForm";
import { saveTags, getTags } from "../services/localStorage";

interface QuickTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTag: (tag: Tag) => void;
}

export const QuickTagModal = ({ isOpen, onClose, onCreateTag }: QuickTagModalProps) => {
  const [tagName, setTagName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tagName.trim()) return;
    
    const newTag: Tag = {
      id: generateId(),
      name: tagName.trim(),
      createdAt: new Date()
    };
    
    // Atualizar localStorage
    const currentTags = getTags();
    saveTags([...currentTags, newTag]);
    
    onCreateTag(newTag);
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setTagName("");
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Tag</DialogTitle>
        </DialogHeader>
        
        <TagForm 
          tagName={tagName}
          setTagName={setTagName}
          onSubmit={handleSubmit}
          onClose={handleClose}
          isEditing={false}
        />
      </DialogContent>
    </Dialog>
  );
};
