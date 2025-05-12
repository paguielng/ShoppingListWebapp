import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import { ShoppingList } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [selectedList, setSelectedList] = useState<ShoppingList | null>(null);

  const handleCreateList = () => {
    setModalType('create-list');
    setIsShowingModal(true);
  };

  const handleEditList = (list: ShoppingList) => {
    setSelectedList(list);
    setModalType('edit-list');
    setIsShowingModal(true);
  };

  const handleDeleteList = (listId: string) => {
    setSelectedList({ id: listId } as ShoppingList);
    setModalType('delete-list');
    setIsShowingModal(true);
  };

  const handleShareList = (list: ShoppingList) => {
    setSelectedList(list);
    setModalType('share-list');
    setIsShowingModal(true);
  };

  const handleArchiveList = (listId: string) => {
    setSelectedList({ id: listId } as ShoppingList);
    setModalType('archive-list');
    setIsShowingModal(true);
  };

  const closeModal = () => {
    setIsShowingModal(false);
    setModalType(null);
    setSelectedList(null);
  };

  // Render appropriate content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            onCreateList={handleCreateList}
            onEditList={handleEditList}
            onDeleteList={handleDeleteList}
            onShareList={handleShareList}
            onArchiveList={handleArchiveList}
          />
        );
      case 'history':
        return <History />;
      case 'active-lists':
      case 'archived':
      case 'statistics':
      case 'settings':
      case 'help':
        return (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Coming Soon</h2>
              <p className="text-gray-500">
                This feature is under development and will be available soon.
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard 
          onCreateList={handleCreateList}
          onEditList={handleEditList}
          onDeleteList={handleDeleteList}
          onShareList={handleShareList}
          onArchiveList={handleArchiveList}
        />;
    }
  };

  // Simple modal to show what would happen
  const renderModal = () => {
    if (!isShowingModal) return null;

    let title = '';
    let content = '';

    switch (modalType) {
      case 'create-list':
        title = 'Create New Shopping List';
        content = 'Here you would create a new shopping list with a form.';
        break;
      case 'edit-list':
        title = 'Edit Shopping List';
        content = `You would edit "${selectedList?.name}" here.`;
        break;
      case 'delete-list':
        title = 'Delete Shopping List';
        content = 'Are you sure you want to delete this list?';
        break;
      case 'share-list':
        title = 'Share Shopping List';
        content = `Share "${selectedList?.name}" with friends or family.`;
        break;
      case 'archive-list':
        title = 'Archive Shopping List';
        content = 'This list will be moved to your archives.';
        break;
      default:
        title = 'Action';
        content = 'Modal content would go here.';
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-700">{content}</p>
          </div>
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
              onClick={closeModal}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar onCreateList={handleCreateList} />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-16 md:w-64 flex-shrink-0 hidden md:block">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      {renderModal()}
    </div>
  );
}

export default App;