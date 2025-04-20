import React from 'react';
import { PlusCircle } from 'lucide-react';
import { FoodItem } from '../../types';
import { useCart } from '../../context/CartContext';

interface FoodCardProps {
  food: FoodItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const { addToCart } = useCart();

  if (!food.available) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
          food.type === 'veg' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {food.type === 'veg' ? '🥬 Veg' : '🍖 Non-veg'}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{food.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-lg text-gray-900">₹{food.price.toFixed(2)}</span>
          
          <button
            onClick={() => addToCart(food)}
            className="flex items-center space-x-1 bg-orange-500 text-white px-3 py-1.5 rounded-full hover:bg-orange-600 transition-colors"
          >
            <PlusCircle size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;