import React, { useState } from 'react';
import { Trash2, MessageSquare, Plus, Minus, DollarSign, Users } from 'lucide-react';
import type { ShoppingGroup } from '../types';
import toast from 'react-hot-toast';
import ChatBox from './ChatBox';

interface CartViewProps {
  group: ShoppingGroup;
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onAddComment: (itemId: string, comment: string) => void;
}

const CartView: React.FC<CartViewProps> = ({
  group,
  onRemoveItem,
  onUpdateQuantity,
  onAddComment
}) => {
  const [commentInputs, setCommentInputs] = useState<{ [itemId: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [itemId: string]: boolean }>({});

  const cartItems = Object.values(group.cart || {});
  const memberCount = Object.keys(group.members || {}).length || 1;

  const totalSpent = typeof group.totalSpent === 'number' ? group.totalSpent : 0;
  const budget = typeof group.budget === 'number' ? group.budget : 1;

  const costPerMember = totalSpent / memberCount;

  const handleCommentSubmit = (itemId: string) => {
    const comment = commentInputs[itemId]?.trim();
    if (comment) {
      onAddComment(itemId, comment);
      setCommentInputs(prev => ({ ...prev, [itemId]: '' }));
      toast.success('Comment added!');
    }
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    const item = group.cart[itemId];
    const newQuantity = Math.max(1, item.quantity + change);
    onUpdateQuantity(itemId, newQuantity);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Budget Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Total Spent</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">${budget.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Budget</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">${costPerMember.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Per Member</p>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Budget Usage</span>
            <span>{((totalSpent / budget) * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                totalSpent > budget ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min((totalSpent / budget) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Shopping Cart ({cartItems.length} items)
          </h2>
        </div>

        {cartItems.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Your cart is empty. Start adding some products!</p>
          </div>
        ) : (
          <div className="divide-y">
            {cartItems.map((item) => (
              <div key={item.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Added by {group.members[item.addedBy]?.displayName || 'Unknown'}
                        </p>
                        <p className="text-xs text-gray-500">{formatTime(item.addedAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 mt-4">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-semibold text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() =>
                          setShowComments((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                        }
                        className="flex items-center text-blue-600 hover:text-blue-700 text-sm ml-4"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Comments ({item.comments?.length || 0})
                      </button>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="flex items-center text-red-600 hover:text-red-700 text-sm ml-4"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>

                    {/* Comments Section */}
                    {showComments[item.id] && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="space-y-3">
                          {item.comments?.map((comment) => (
                            <div key={comment.id} className="text-sm">
                              <div className="flex justify-between items-start">
                                <span className="font-medium text-gray-900">{comment.authorName}</span>
                                <span className="text-gray-500 text-xs">{formatTime(comment.timestamp)}</span>
                              </div>
                              <p className="text-gray-700 mt-1">{comment.text}</p>
                            </div>
                          ))}

                          {/* Add Comment */}
                          <div className="flex space-x-2 mt-3">
                            <input
                              type="text"
                              placeholder="Add a comment..."
                              value={commentInputs[item.id] || ''}
                              onChange={(e) =>
                                setCommentInputs((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.value
                                }))
                              }
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(item.id)}
                            />
                            <button
                              onClick={() => handleCommentSubmit(item.id)}
                              className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                              disabled={!commentInputs[item.id]?.trim()}
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Box */}
      <ChatBox groupId={group.id} group={group} />
    </div>
  );
};

export default CartView;