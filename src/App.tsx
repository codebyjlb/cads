import React, { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ItemGrid } from './components/ItemGrid';
import { AddItemModal } from './components/AddItemModal';
import { ItemPage } from './components/ItemPage';
import { CategoryPage } from './components/CategoryPage';
import { SearchPage } from './components/SearchPage';
import { SEOHead } from './components/SEOHead';
import { categories, mockItems } from './data/mockData';
import { MarketplaceItem } from './types';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [items, setItems] = useState<MarketplaceItem[]>(mockItems);

  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    return filtered;
  }, [items, selectedCategory]);

  const handleAddItem = (itemData: any) => {
    const newItem: MarketplaceItem = {
      ...itemData,
      image: itemData.image || 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500',
    };
    setItems([newItem, ...items]);
  };

  const HomePage = () => (
    <>
      <SEOHead
        title="CDOADS - Cagayan De Oro Marketplace | Buy & Sell Locally"
        description="Discover amazing deals on electronics, furniture, clothing, and more. Buy and sell items locally on CityMarket - your trusted local marketplace."
        url={window.location.origin}
      />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'All Items' : 
             categories.find(cat => cat.id === selectedCategory)?.name}
          </h2>
          <p className="text-gray-600 mt-1">
            {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} available
          </p>
        </div>
        
        <ItemGrid
          items={filteredItems}
          onCategoryFilter={setSelectedCategory}
        />
      </main>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddItemClick={() => setIsAddModalOpen(true)}
      />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:id" element={<ItemPage items={items} />} />
        <Route path="/category/:categoryId" element={<CategoryPage items={items} />} />
        <Route path="/search" element={<SearchPage items={items} />} />
      </Routes>
      
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddItem}
      />
    </div>
  );
}

export default App;