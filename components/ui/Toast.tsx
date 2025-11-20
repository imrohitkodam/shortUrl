
import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for fade out transition
    }, 2700);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div
      className={`fixed top-5 right-5 ${bgColor} text-white py-2 px-4 rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${
        visible ? 'transform translate-x-0' : 'transform translate-x-full'
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
