import React, { useState } from 'react';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { useFood } from '../../context/FoodContext';
import FoodItemForm from './FoodItemForm';
import { FoodItem } from '../../types';

const FoodManagement: React.FC = () => {
  const { foodItems, addFoodItem, updateFoodItem, deleteFoodItem, toggleAvailability } = useFood();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: FoodItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = (foodData: Omit<FoodItem, 'id'>) => {
    if (editingItem) {
      updateFoodItem(editingItem.id, foodData);
    } else {
      addFoodItem(foodData);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteFoodItem(id);
    }
  };

  // Get unique categories
  const categories = [...new Set(foodItems.map(item => item.category))];

  // Filter items by category
  const filteredItems = filterCategory === 'all'
    ? foodItems
    : foodItems.filter(item => item.category === filterCategory);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Food Management</h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          <PlusCircle size={18} />
          <span>Add Item</span>
        </button>
      </div>
      
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1 rounded-md text-sm ${
            filterCategory === 'all'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-3 py-1 rounded-md text-sm capitalize ${
              filterCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {showForm ? (
        <FoodItemForm
          onSubmit={handleSubmit}
          initialData={editingItem || undefined}
          onCancel={handleCancel}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 mr-3 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-gray-500 text-sm line-clamp-1">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    ₹{item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={item.available}
                        onChange={() => toggleAvailability(item.id)}
                        className="form-checkbox h-4 w-4 text-orange-500"
                      />
                      <span className={`ml-2 text-sm ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </span>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No food items found in this category.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodManagement;