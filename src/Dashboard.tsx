import React, { useState } from 'react';
import ShoppingListGrid from '../components/ShoppingListGrid';
import { ShoppingList } from '../types';
import { shoppingLists } from '../data/mockData';
import { ListPlus, Filter, SortDesc } from 'lucide-react';
import Button from '../components/ui/Button';

interface DashboardProps {
  onCreateList: () => void;
  onEditList: (list: ShoppingList) => void;
  onDeleteList: (listId: string) => void;
  onShareList: (list: ShoppingList) => void;
  onArchiveList: (listId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  onCreateList,
  onEditList,
  onDeleteList,
  onShareList,
  onArchiveList,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
  const [filterBy, setFilterBy] = useState<'all' | 'shared'>('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter and sort lists
  const filteredLists = shoppingLists
    .filter(list => !list.archived) // Only non-archived lists
    .filter(list => {
      // Filter by search term
      if (searchTerm) {
        return list.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
               list.description?.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    })
    .filter(list => {
      // Filter by shared status
      if (filterBy === 'shared') {
        return list.sharedWith.length > 0;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by selected criterion
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Shopping Lists</h1>
        <p className="mt-1 text-gray-500">Manage your shopping lists and track your expenses</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search lists..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              onClick={() => setFilterBy(filterBy === 'all' ? 'shared' : 'all')}
            >
              <Filter size={16} className="mr-2" />
              {filterBy === 'all' ? 'All Lists' : 'Shared Only'}
            </button>
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              onClick={() => setSortBy(sortBy === 'date' ? 'name' : 'date')}
            >
              <SortDesc size={16} className="mr-2" />
              Sort: {sortBy === 'date' ? 'Latest' : 'Name'}
            </button>
          </div>

          <Button
            variant="primary"
            icon={<ListPlus size={18} />}
            onClick={onCreateList}
          >
            Create List
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <ShoppingListGrid
          lists={filteredLists}
          onEditList={onEditList}
          onDeleteList={onDeleteList}
          onShareList={onShareList}
          onArchiveList={onArchiveList}
        />
      </div>
    </div>
  );
};

export default Dashboard;