import React, { useState, useEffect, useRef } from 'react';
import { Plus, Users, Calendar, DollarSign, Copy, Check, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { ShoppingGroup } from '../types';

interface GroupsViewProps {
  groups: ShoppingGroup[];
  currentGroup: ShoppingGroup | null;
  onCreateGroup: (name: string, description: string, budget: number) => void;
  onJoinGroup: (groupId: string) => void;
  onSelectGroup: (groupId: string) => void;
  onDeleteGroup: (groupId: string) => void;
}

const GroupsView: React.FC<GroupsViewProps> = ({
  groups,
  currentGroup,
  onCreateGroup,
  onJoinGroup,
  onSelectGroup,
  onDeleteGroup
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', budget: '' });
  const [joinGroupId, setJoinGroupId] = useState('');
  const [copiedGroupId, setCopiedGroupId] = useState<string | null>(null);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState(false);

  const createInputRef = useRef<HTMLInputElement>(null);
  const joinInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showCreateForm && createInputRef.current) createInputRef.current.focus();
    if (showJoinForm && joinInputRef.current) joinInputRef.current.focus();
  }, [showCreateForm, showJoinForm]);

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    const budget = parseFloat(formData.budget);
    if (isNaN(budget) || budget < 0) {
      toast.error('Please enter a valid budget.');
      return;
    }
    try {
      setLoadingCreate(true);
      await onCreateGroup(formData.name, formData.description, budget);
      setFormData({ name: '', description: '', budget: '' });
      setShowCreateForm(false);
      toast.success('Group created successfully!');
    } catch {
      toast.error('Failed to create group');
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadingJoin(true);
      await onJoinGroup(joinGroupId);
      setJoinGroupId('');
      setShowJoinForm(false);
      toast.success('Joined group successfully!');
    } catch {
      toast.error('Failed to join group');
    } finally {
      setLoadingJoin(false);
    }
  };

  const copyGroupId = (groupId: string) => {
    navigator.clipboard.writeText(groupId);
    setCopiedGroupId(groupId);
    toast.success('Group ID copied!');
    setTimeout(() => setCopiedGroupId(null), 2000);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Shopping Groups</h2>
        <div className="flex space-x-3">
          <button onClick={() => setShowJoinForm(true)} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            Join Group
          </button>
          <button onClick={() => setShowCreateForm(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
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
            <input ref={createInputRef} required type="text" placeholder="Group Name" className="w-full border p-2 rounded"
              value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} />
            <textarea placeholder="Description" rows={3} className="w-full border p-2 rounded"
              value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} />
            <input required type="number" min="0" step="0.01" placeholder="Budget"
              value={formData.budget} onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
              className="w-full border p-2 rounded" />
            <div className="flex justify-end space-x-3">
              <button type="button" onClick={() => setShowCreateForm(false)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                {loadingCreate ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Join Group Form */}
      {showJoinForm && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Join Group</h3>
          <form onSubmit={handleJoinGroup} className="space-y-4">
            <input ref={joinInputRef} required type="text" placeholder="Group ID"
              value={joinGroupId} onChange={(e) => setJoinGroupId(e.target.value)} className="w-full border p-2 rounded" />
            <div className="flex justify-end space-x-3">
              <button type="button" onClick={() => setShowJoinForm(false)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                {loadingJoin ? 'Joining...' : 'Join'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Groups List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.id} className={`bg-white p-4 rounded-lg border shadow-sm cursor-pointer transition ${
            currentGroup?.id === group.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`} onClick={() => onSelectGroup(group.id)}>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{group.name}</h3>
              <div className="flex items-center space-x-2">
                <button onClick={(e) => { e.stopPropagation(); copyGroupId(group.id); }} className="text-gray-400 hover:text-gray-600">
                  {copiedGroupId === group.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDeleteGroup(group.id); }} className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-1">{group.description}</p>
            <div className="mt-3 text-sm space-y-1 text-gray-600">
              <div className="flex items-center"><Users className="h-4 w-4 mr-1" /> {Object.keys(group.members || {}).length} members</div>
              <div className="flex items-center"><DollarSign className="h-4 w-4 mr-1" /> ${group.totalSpent?.toFixed(2)} / ${group.budget?.toFixed(2)}</div>
              <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> Created {formatDate(group.createdAt)}</div>
              {group.totalSpent > group.budget && <div className="text-red-500 text-xs font-medium">Over budget!</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupsView;