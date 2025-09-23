import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, SortAsc } from 'lucide-react';
import { ItemCard } from './ItemCard';
import { SEOHead } from './SEOHead';
import { MarketplaceItem } from '../types';
import { categories } from '../data/mockData';

interface CategoryPageProps {
  items: MarketplaceItem[];
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ items }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const category = categories.find(cat => cat.id === categoryId);
  const categoryItems = useMemo(() => {
    if (!categoryId || categoryId === 'all') return items;
    return items.filter(item => item.category === categoryId);
  }, [items, categoryId]);

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to marketplace
          </button>
        </div>
      </div>
    );
  }

  const categoryName = category.name;
  const categoryIcon = category.icon;

  return (
    <>
      <SEOHead
        title={`${categoryName} for Sale | CityMarket Local Marketplace`}
        description={`Browse ${categoryItems.length} ${categoryName.toLowerCase()} items for sale in your local area. Find great deals on ${categoryName.toLowerCase()} at CityMarket.`}
        url={`${window.location.origin}/category/${categoryId}`}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                
                <div className="flex items-center space-x-3">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
                    <p className="text-sm text-gray-600">
                      {categoryItems.length} item{categoryItems.length !== 1 ? 's' : ''} available
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <SortAsc className="w-4 h-4" />
                  <span className="hidden sm:inline">Sort</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {categoryItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <div className="w-16 h-16 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl text-gray-400">📦</span>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {categoryName.toLowerCase()} items found
              </h3>
              <p className="text-gray-500 mb-6">
                Be the first to list an item in this category!
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Browse all categories
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {categoryItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};