import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import { useShoppingGroup } from './hooks/useShoppingGroup';
import AuthForm from './components/AuthForm';
import Layout from './components/Layout';
import CartView from './components/CartView';
import GroupsView from './components/GroupsView';
import ActivityView from './components/ActivityView';
import ProductSearch from './components/ProductSearch';
import toast from 'react-hot-toast';

function App() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'cart' | 'groups' | 'activity'>('cart');
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);
  const [userGroups, setUserGroups] = useState<any[]>([]);
  
  const { group, loading: groupLoading, createGroup, joinGroup, addItemToCart, removeItemFromCart, updateItemQuantity, addComment } = useShoppingGroup(currentGroupId, user);

  useEffect(() => {
    // In a real app, you would fetch user's groups from Firebase
    // For demo purposes, we'll use localStorage
    const savedGroups = localStorage.getItem('userGroups');
    if (savedGroups) {
      setUserGroups(JSON.parse(savedGroups));
    }
    
    const savedGroupId = localStorage.getItem('currentGroupId');
    if (savedGroupId) {
      setCurrentGroupId(savedGroupId);
    }
  }, []);

  const handleCreateGroup = async (name: string, description: string, budget: number) => {
    try {
      const groupId = await createGroup(name, description, budget);
      setCurrentGroupId(groupId);
      localStorage.setItem('currentGroupId', groupId);
      
      // Update user groups list
      const newGroup = { id: groupId, name, description, budget };
      const updatedGroups = [...userGroups, newGroup];
      setUserGroups(updatedGroups);
      localStorage.setItem('userGroups', JSON.stringify(updatedGroups));
      
      setActiveTab('cart');
    } catch (error) {
      throw error;
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      await joinGroup(groupId);
      setCurrentGroupId(groupId);
      localStorage.setItem('currentGroupId', groupId);
      setActiveTab('cart');
    } catch (error) {
      throw error;
    }
  };

  const handleSelectGroup = (groupId: string) => {
    setCurrentGroupId(groupId);
    localStorage.setItem('currentGroupId', groupId);
    setActiveTab('cart');
  };

  const handleAddToCart = async (product: any) => {
    if (!group) {
      toast.error('Please select a group first');
      return;
    }
    
    try {
      await addItemToCart({
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeItemFromCart(itemId);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      await updateItemQuantity(itemId, quantity);
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleAddComment = async (itemId: string, comment: string) => {
    try {
      await addComment(itemId, comment);
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Layout activeTab={activeTab} onTabChange={setActiveTab}>
          {activeTab === 'cart' && (
            <div className="space-y-6">
              {group ? (
                <>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {group.name}
                    </h2>
                    <p className="text-gray-600 mb-4">{group.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{Object.keys(group.members).length} members</span>
                      <span>•</span>
                      <span>Group ID: {group.id}</span>
                    </div>
                  </div>
                  <ProductSearch onAddToCart={handleAddToCart} />
                  <CartView
                    group={group}
                    onRemoveItem={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
                    onAddComment={handleAddComment}
                  />
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    No Group Selected
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Create a new group or join an existing one to start shopping collaboratively.
                  </p>
                  <button
                    onClick={() => setActiveTab('groups')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Manage Groups
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'groups' && (
            <GroupsView
              groups={userGroups}
              currentGroup={group}
              onCreateGroup={handleCreateGroup}
              onJoinGroup={handleJoinGroup}
              onSelectGroup={handleSelectGroup}
            />
          )}
          
          {activeTab === 'activity' && (
            <ActivityView activity={group?.activity || []} />
          )}
        </Layout>
        
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;