import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <p className="text-gray-600 text-sm">₹{item.price.toFixed(2)} each</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <Minus size={16} />
        </button>
        
        <span className="w-8 text-center">{item.quantity}</span>
        
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <Plus size={16} />
        </button>
        
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-1 ml-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;