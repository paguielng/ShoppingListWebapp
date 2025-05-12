import React from 'react';
import { ShoppingList } from '../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Edit, Share2, ShoppingBag, Trash2, Archive } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Avatar from './ui/Avatar';
import { users } from '../data/mockData';

interface ShoppingListCardProps {
  list: ShoppingList;
  onEdit?: (list: ShoppingList) => void;
  onDelete?: (listId: string) => void;
  onShare?: (list: ShoppingList) => void;
  onArchive?: (listId: string) => void;
}

const ShoppingListCard: React.FC<ShoppingListCardProps> = ({
  list,
  onEdit,
  onDelete,
  onShare,
  onArchive,
}) => {
  const { name, description, items, sharedWith, totalEstimatedCost } = list;
  
  const completedItems = items.filter(item => item.purchased).length;
  const totalItems = items.length;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get user avatars for those who the list is shared with
  const sharedUsers = users.filter(user => sharedWith.includes(user.id));

  return (
    <Card className="h-full transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{name}</CardTitle>
            {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
          </div>
          <Badge variant="primary" className="ml-2">
            {formatDate(list.updatedAt)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{completedItems}/{totalItems} items</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ShoppingBag size={16} className="text-blue-600 mr-2" />
            <span className="text-sm font-medium">
              Total: ${totalEstimatedCost.toFixed(2)}
            </span>
          </div>
          
          {sharedUsers.length > 0 && (
            <div className="flex -space-x-2">
              {sharedUsers.slice(0, 3).map(user => (
                <Avatar 
                  key={user.id}
                  src={user.avatar}
                  alt={user.name}
                  size="sm"
                  className="border-2 border-white"
                />
              ))}
              {sharedUsers.length > 3 && (
                <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-gray-600 font-medium">+{sharedUsers.length - 3}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            icon={<Edit size={16} />}
            onClick={() => onEdit && onEdit(list)}
          >
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            icon={<Share2 size={16} />}
            onClick={() => onShare && onShare(list)}
          >
            Share
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            icon={<Archive size={16} />}
            onClick={() => onArchive && onArchive(list.id)}
          >
            Archive
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            icon={<Trash2 size={16} />}
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete && onDelete(list.id)}
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ShoppingListCard;