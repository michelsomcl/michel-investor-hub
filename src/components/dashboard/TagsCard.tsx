
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Tag } from "../../types";

interface TagsCardProps {
  tags: Tag[];
}

export const TagsCard = ({ tags }: TagsCardProps) => {
  return (
    <Card className="border card-hover">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tags</h2>
          <Link to="/tags" className="text-primary hover:underline text-sm">
            Gerenciar
          </Link>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div key={tag.id} className="flex items-center">
              <Badge className="bg-primary">
                {tag.name}
              </Badge>
            </div>
          ))}
          
          {tags.length === 0 && (
            <div className="text-center py-8 w-full">
              <p className="text-muted-foreground">Nenhuma tag cadastrada</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
