import { useState, useEffect } from 'react';
import { ref, onValue, push, set, remove } from 'firebase/database';
import { database } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import type { ShoppingGroup, CartItem, ActivityLog, User } from '../types';

export const useShoppingGroup = (groupId: string | null, user: User | null) => {
  const [group, setGroup] = useState<ShoppingGroup | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!groupId) {
      setGroup(null);
      setLoading(false);
      return;
    }

    const groupRef = ref(database, `groups/${groupId}`);
    const unsubscribe = onValue(groupRef, (snapshot) => {
      if (snapshot.exists()) {
        setGroup(snapshot.val());
      } else {
        setGroup(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [groupId]);

const createGroup = async (name: string, description: string, budget: number) => {
  if (!user) throw new Error('User not authenticated');

  const groupId = uuidv4();
  const safeUser = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || 'Anonymous',
    ...(user.photoURL ? { photoURL: user.photoURL } : {})
  };

  const newGroup: ShoppingGroup = {
    id: groupId,
    name,
    description,
    createdBy: user.uid,
    createdAt: Date.now(),
    members: {
      [user.uid]: safeUser
    },
    cart: {},
    budget,
    totalSpent: 0,
    activity: []
  };

  const groupRef = ref(database, `groups/${groupId}`);
  await set(groupRef, newGroup);
  return groupId;
};


 const joinGroup = async (groupId: string) => {
  if (!user) throw new Error('User not authenticated');

  const safeUser = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || 'Anonymous',
    ...(user.photoURL ? { photoURL: user.photoURL } : {})
  };

  const memberRef = ref(database, `groups/${groupId}/members/${user.uid}`);
  await set(memberRef, safeUser);

  // Add activity log
  const activityRef = ref(database, `groups/${groupId}/activity`);
  const newActivity: ActivityLog = {
    id: uuidv4(),
    type: 'member_joined',
    message: `${safeUser.displayName} joined the group`,
    user: user.uid,
    userName: safeUser.displayName,
    timestamp: Date.now()
  };
  await push(activityRef, newActivity);
};


  const addItemToCart = async (item: Omit<CartItem, 'id' | 'addedBy' | 'addedAt' | 'comments'>) => {
    if (!user || !group) throw new Error('User not authenticated or group not found');

    const itemId = uuidv4();
    const cartItem: CartItem = {
      ...item,
      id: itemId,
      addedBy: user.uid,
      addedAt: Date.now(),
      comments: []
    };

    const itemRef = ref(database, `groups/${group.id}/cart/${itemId}`);
    await set(itemRef, cartItem);

    // Update total spent
    const newTotal = group.totalSpent + (item.price * item.quantity);
    const totalRef = ref(database, `groups/${group.id}/totalSpent`);
    await set(totalRef, newTotal);

    // Add activity log
    const activityRef = ref(database, `groups/${group.id}/activity`);
    const newActivity: ActivityLog = {
      id: uuidv4(),
      type: 'item_added',
      message: `${user.displayName} added ${item.name} to cart`,
      user: user.uid,
      userName: user.displayName,
      timestamp: Date.now()
    };
    await push(activityRef, newActivity);
  };

  const removeItemFromCart = async (itemId: string) => {
    if (!user || !group) throw new Error('User not authenticated or group not found');

    const item = group.cart[itemId];
    if (!item) throw new Error('Item not found');

    const itemRef = ref(database, `groups/${group.id}/cart/${itemId}`);
    await remove(itemRef);

    // Update total spent
    const newTotal = group.totalSpent - (item.price * item.quantity);
    const totalRef = ref(database, `groups/${group.id}/totalSpent`);
    await set(totalRef, newTotal);

    // Add activity log
    const activityRef = ref(database, `groups/${group.id}/activity`);
    const newActivity: ActivityLog = {
      id: uuidv4(),
      type: 'item_removed',
      message: `${user.displayName} removed ${item.name} from cart`,
      user: user.uid,
      userName: user.displayName,
      timestamp: Date.now()
    };
    await push(activityRef, newActivity);
  };

  const updateItemQuantity = async (itemId: string, quantity: number) => {
    if (!user || !group) throw new Error('User not authenticated or group not found');

    const item = group.cart[itemId];
    if (!item) throw new Error('Item not found');

    const oldTotal = item.price * item.quantity;
    const newTotal = item.price * quantity;
    const totalDiff = newTotal - oldTotal;

    const quantityRef = ref(database, `groups/${group.id}/cart/${itemId}/quantity`);
    await set(quantityRef, quantity);

    // Update total spent
    const updatedTotal = group.totalSpent + totalDiff;
    const totalRef = ref(database, `groups/${group.id}/totalSpent`);
    await set(totalRef, updatedTotal);
  };

  const addComment = async (itemId: string, text: string) => {
    if (!user || !group) throw new Error('User not authenticated or group not found');

    const commentId = uuidv4();
    const comment = {
      id: commentId,
      text,
      author: user.uid,
      authorName: user.displayName,
      timestamp: Date.now()
    };

    const commentRef = ref(database, `groups/${group.id}/cart/${itemId}/comments/${commentId}`);
    await set(commentRef, comment);
  };

  return {
    group,
    loading,
    createGroup,
    joinGroup,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    addComment
  };
};