import React from 'react';
import { CategorySection } from './CategorySection';
import { MarketplaceItem } from '../types';
import { categories } from '../data/mockData';

interface ItemGridProps {
  items: MarketplaceItem[];
  onCategoryFilter: (categoryId: string) => void;
}

export const ItemGrid: React.FC<ItemGridProps> = ({ items, onCategoryFilter }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
        <p className="text-gray-500">Try adjusting your search or browse different categories.</p>
      </div>
    );
  }

  // Group items by category
  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MarketplaceItem[]>);

  return (
    <div className="space-y-8">
      {categories
        .filter(category => category.id !== 'all' && itemsByCategory[category.id]?.length > 0)
        .map((category) => (
        <CategorySection
          key={category.id}
          categoryId={category.id}
          categoryName={category.name}
          categoryIcon={category.icon}
          items={itemsByCategory[category.id] || []}
          onViewAll={onCategoryFilter}
        />
      ))}
    </div>
  );
};