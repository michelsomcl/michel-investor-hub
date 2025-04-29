
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
import { getRandomColor, generateId } from "../lib/utils";

interface QuickTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTag: (tag: Tag) => void;
}

export const QuickTagModal = ({ isOpen, onClose, onCreateTag }: QuickTagModalProps) => {
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState(getRandomColor());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tagName.trim()) return;
    
    const newTag: Tag = {
      id: generateId(),
      name: tagName.trim(),
      color: tagColor,
      createdAt: new Date()
    };
    
    onCreateTag(newTag);
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setTagName("");
    setTagColor(getRandomColor());
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
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
