"use client"
import Image from "next/image";
import React from "react";
import { DeleteItemModal } from "./delete-item";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface ItemProps {
  item: {
    id: string;
    imageUrl: string;
    name: string;
    description: string | null;
  },
}

const ItemCard = ({ item }: ItemProps) => {


  return (
    <div className="w-auto h-full">
      <Image
        className="rounded-t-md"
        src={item.imageUrl}
        objectFit="cover"
        alt={item.name}
        width={250}
        height={300}
      />
      <div className="flex items-center justify-between mb-2 w-auto">
        <div className="mt-3">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-base text-muted-foreground">{item.description}</p>
          <DeleteItemModal itemId={item.id}/>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
