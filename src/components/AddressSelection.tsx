import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddressSelection: React.FC = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<string[]>(['123 Main St, City, Country']);
  const [newAddress, setNewAddress] = useState('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const handleAddAddress = () => {
    if (newAddress.trim()) {
      setAddresses([...addresses, newAddress]);
      setNewAddress('');
      setIsAddingAddress(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">{isAddingAddress ? 'Add Address' : 'Select Address'}</h1>

      {!isAddingAddress ? (
        <>
          <ul className="mb-4">
            {addresses.map((address, index) => (
              <li key={index} className="mb-2">
                <input type="radio" name="address" id={`address-${index}`} />
                <label htmlFor={`address-${index}`} className="ml-2">{address}</label>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsAddingAddress(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Add New Address
          </button>
          <button
            onClick={() => navigate('/payment')}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Proceed to Payment
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Enter new address"
            className="border p-2 mb-4 w-full max-w-md"
          />
          <button
            onClick={handleAddAddress}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Save Address
          </button>
          <button
            onClick={() => setIsAddingAddress(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back to Select Address
          </button>
        </>
      )}
    </div>
  );
};

export default AddressSelection;
