
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tag } from "../types";
import { generateId } from "../lib/utils";

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
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" className="btn-primary">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
