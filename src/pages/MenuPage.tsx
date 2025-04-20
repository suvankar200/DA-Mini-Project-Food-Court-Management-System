import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import FoodCard from '../components/Food/FoodCard';
import CategoryFilter from '../components/Food/CategoryFilter';
import { useFood } from '../context/FoodContext';

const MenuPage: React.FC = () => {
  const { foodItems } = useFood();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(foodItems.map(item => item.category))];
  }, [foodItems]);

  // Filter items by search query and category
  const filteredItems = useMemo(() => {
    return foodItems
      .filter(item => item.available)
      .filter(item => 
        selectedCategory === 'all' || item.category === selectedCategory
      )
      .filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [foodItems, selectedCategory, searchQuery]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Food Menu</h1>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-2">No items found</p>
          <p className="text-gray-400 text-sm">
            Try changing your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuPage;