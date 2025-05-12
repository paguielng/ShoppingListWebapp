import React from 'react';
import { ShoppingList } from '../types';
import ShoppingListCard from './ShoppingListCard';

interface ShoppingListGridProps {
  lists: ShoppingList[];
  onEditList: (list: ShoppingList) => void;
  onDeleteList: (listId: string) => void;
  onShareList: (list: ShoppingList) => void;
  onArchiveList: (listId: string) => void;
}

const ShoppingListGrid: React.FC<ShoppingListGridProps> = ({
  lists,
  onEditList,
  onDeleteList,
  onShareList,
  onArchiveList,
}) => {
  if (lists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-blue-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No shopping lists yet</h3>
        <p className="text-gray-500">Create your first shopping list to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {lists.map((list) => (
        <ShoppingListCard
          key={list.id}
          list={list}
          onEdit={onEditList}
          onDelete={onDeleteList}
          onShare={onShareList}
          onArchive={onArchiveList}
        />
      ))}
    </div>
  );
};

export default ShoppingListGrid;