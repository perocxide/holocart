import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentInterface: React.FC = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    alert('Payment Successful!');
    navigate('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Interface</h1>
      <p className="mb-4">This is a dummy payment interface. Click below to simulate payment.</p>
      <button onClick={handlePayment} className="bg-green-500 text-white px-4 py-2 rounded">Make Payment</button>
    </div>
  );
};

export default PaymentInterface;
