import React, { useState } from 'react';
import { Plus, Users, Calendar, DollarSign, Copy, Check } from 'lucide-react';
import type { ShoppingGroup } from '../types';
import toast from 'react-hot-toast';

interface GroupsViewProps {
  groups: ShoppingGroup[];
  currentGroup: ShoppingGroup | null;
  onCreateGroup: (name: string, description: string, budget: number) => void;
  onJoinGroup: (groupId: string) => void;
  onSelectGroup: (groupId: string) => void;
}

const GroupsView: React.FC<GroupsViewProps> = ({
  groups,
  currentGroup,
  onCreateGroup,
  onJoinGroup,
  onSelectGroup
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: ''
  });
  const [joinGroupId, setJoinGroupId] = useState('');
  const [copiedGroupId, setCopiedGroupId] = useState<string | null>(null);

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onCreateGroup(formData.name, formData.description, parseFloat(formData.budget));
      setFormData({ name: '', description: '', budget: '' });
      setShowCreateForm(false);
      toast.success('Group created successfully!');
    } catch (error) {
      toast.error('Failed to create group');
    }
  };

  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onJoinGroup(joinGroupId);
      setJoinGroupId('');
      setShowJoinForm(false);
      toast.success('Joined group successfully!');
    } catch (error) {
      toast.error('Failed to join group');
    }
  };

  const copyGroupId = (groupId: string) => {
    navigator.clipboard.writeText(groupId);
    setCopiedGroupId(groupId);
    toast.success('Group ID copied to clipboard!');
    setTimeout(() => setCopiedGroupId(null), 2000);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Shopping Groups</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowJoinForm(true)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Join Group
          </button>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </button>
        </div>
      </div>

      {/* Create Group Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Group</h3>
          <form onSubmit={handleCreateGroup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Family Grocery Shopping"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="What's this group for?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="100.00"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Group
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Join Group Form */}
      {showJoinForm && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Join Existing Group</h3>
          <form onSubmit={handleJoinGroup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group ID</label>
              <input
                type="text"
                required
                value={joinGroupId}
                onChange={(e) => setJoinGroupId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter group ID to join"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowJoinForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Join Group
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Groups List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div
            key={group.id}
            className={`bg-white rounded-lg shadow-sm p-6 border-2 cursor-pointer transition-all ${
              currentGroup?.id === group.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelectGroup(group.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyGroupId(group.id);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {copiedGroupId === group.id ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{group.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                {Object.keys(group.members).length} members
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                ${group.totalSpent.toFixed(2)} / ${group.budget.toFixed(2)}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Created {formatDate(group.createdAt)}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    group.totalSpent > group.budget ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((group.totalSpent / group.budget) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupsView;