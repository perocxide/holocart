import React from 'react';
import { Clock, ShoppingCart, Users, Trash2, Edit } from 'lucide-react';
import type { ActivityLog } from '../types';

interface ActivityViewProps {
  activity?: ActivityLog[] | null | undefined;
}

const ActivityView: React.FC<ActivityViewProps> = ({ activity }) => {
  // ✅ Ensure activity is an array
  const safeActivity = Array.isArray(activity) ? activity : [];

  const getActivityIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'item_added':
        return <ShoppingCart className="h-5 w-5 text-green-600" />;
      case 'item_removed':
        return <Trash2 className="h-5 w-5 text-red-600" />;
      case 'item_updated':
        return <Edit className="h-5 w-5 text-blue-600" />;
      case 'member_joined':
        return <Users className="h-5 w-5 text-purple-600" />;
      case 'member_left':
        return <Users className="h-5 w-5 text-gray-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const sortedActivity = [...safeActivity].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Activity Feed</h2>
      </div>

      {sortedActivity.length === 0 ? (
        <div className="p-8 text-center">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No activity yet. Start shopping to see updates here!</p>
        </div>
      ) : (
        <div className="divide-y">
          {sortedActivity.map((log) => (
            <div key={log.id} className="p-6 flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">{getActivityIcon(log.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{log.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {log.userName || 'Unknown'} • {formatDate(log.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityView;