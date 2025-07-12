import React, { useState, useEffect } from 'react';
import { ref, push, onValue, update } from 'firebase/database';
import { database } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';
import type { ShoppingGroup } from '../types';
import { MessageSquare } from 'lucide-react';
import { Pin, PinOff } from 'lucide-react';

interface ChatBoxProps {
  groupId: string;
  group: ShoppingGroup;
}

interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: number;
  isPinned?: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ groupId, group }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const chatRef = ref(database, `groups/${groupId}/chats`);
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const chatMessages = data ? Object.values(data) : [];
      setMessages(chatMessages as ChatMessage[]);
    });

    return () => unsubscribe();
  }, [groupId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const chatRef = ref(database, `groups/${groupId}/chats`);
    const message: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      senderId: user?.uid || 'unknown',
      senderName: user?.displayName || 'Anonymous',
      timestamp: Date.now(),
    };

    await push(chatRef, message);
    setNewMessage('');
  };

  const togglePinMessage = async (messageId: string, isPinned: boolean) => {
    const messageRef = ref(database, `groups/${groupId}/chats/${messageId}`);
    await update(messageRef, { isPinned: !isPinned });
  };

  const sortedMessages = [...messages].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.timestamp - a.timestamp; // Sort by timestamp descending for non-pinned messages
  });

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 ease-in-out focus:outline-none relative"
      >
        <MessageSquare className="h-8 w-8" />
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div
          className="fixed top-0 right-0 bg-white shadow-lg h-full w-1/3 flex flex-col"
          style={{ width: '30%' }}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold">Group Chat</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {sortedMessages.map((msg) => (
              <div key={msg.id} className="mb-2 group">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {msg.senderName} {group.createdBy === msg.senderId && <span className="text-xs text-blue-500">(admin)</span>}
                  </span>
                  <button
                    onClick={() => togglePinMessage(msg.id, msg.isPinned || false)}
                    className="text-gray-500 hover:text-gray-700 group-hover:visible invisible"
                  >
                    {msg.isPinned ? <Pin className="h-4 w-4 text-blue-500" /> : <PinOff className="h-4 w-4 text-gray-500" />}
                  </button>
                </div>
                <p className="text-sm text-gray-700">{msg.text}</p>
                <span className="text-xs text-gray-500">
                  {msg.timestamp && !isNaN(msg.timestamp) ? new Date(msg.timestamp).toLocaleString() : 'Invalid date'}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded p-2"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
