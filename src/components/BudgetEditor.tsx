import React, { useState } from 'react';

interface BudgetEditorProps {
  budget: number;
  onUpdate: (newBudget: number) => void | Promise<void>;
}

const BudgetEditor: React.FC<BudgetEditorProps> = ({ budget, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(budget.toFixed(2));
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const newBudget = parseFloat(value);
    if (isNaN(newBudget) || newBudget < 0) return;
    setLoading(true);
    await onUpdate(newBudget);
    setLoading(false);
    setEditing(false);
  };

  return editing ? (
    <span className="flex items-center space-x-2">
      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="border rounded px-2 py-1 w-20"
        disabled={loading}
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
      <button
        onClick={() => setEditing(false)}
        className="bg-gray-200 px-2 py-1 rounded text-xs"
        disabled={loading}
      >
        Cancel
      </button>
    </span>
  ) : (
    <span className="flex items-center space-x-2">
      <span>${budget.toFixed(2)}</span>
      <button
        onClick={() => setEditing(true)}
        className="bg-gray-200 px-2 py-1 rounded text-xs"
      >
        Edit
      </button>
    </span>
  );
};

export { BudgetEditor };
