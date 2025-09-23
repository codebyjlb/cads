import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemCard } from './ItemCard';
import { MarketplaceItem } from '../types';
import { ChevronRight } from 'lucide-react';

interface CategorySectionProps {
  categoryName: string;
  categoryIcon: string;
  items: MarketplaceItem[];
  onViewAll: (categoryId: string) => void;
  categoryId: string;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categoryName,
  categoryIcon,
  items,
  onViewAll,
  categoryId,
}) => {
  const navigate = useNavigate();

  if (items.length === 0) return null;

  const handleViewAll = () => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-bold text-gray-900">{categoryName}</h2>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
            {items.length}
          </span>
        </div>
        <button
          onClick={handleViewAll}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          <span>View all</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 pb-2">
          {items.slice(0, 12).map((item) => (
            <div key={item.id} className="flex-shrink-0 w-48">
              <ItemCard
                item={item}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};