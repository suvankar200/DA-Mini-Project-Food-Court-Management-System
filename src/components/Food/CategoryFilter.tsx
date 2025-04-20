import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onChange,
}) => {
  // Mapping old names to new ones
  const categoryNameMap: { [key: string]: string } = {
    burger: 'breakfast',
    sides: 'lunch',
    pizza: 'snacks',
    beverages: 'dinner',
    rice: 'rice', // Optional: handle 'rice' as is or remove if unused 
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === 'all'
            ? 'bg-orange-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
            selectedCategory === category
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {categoryNameMap[category] || category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
