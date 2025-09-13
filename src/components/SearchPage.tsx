import React, { useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Filter, SortAsc, Search } from 'lucide-react';
import { ItemCard } from './ItemCard';
import { SEOHead } from './SEOHead';
import { MarketplaceItem } from '../types';

interface SearchPageProps {
  items: MarketplaceItem[];
}

export const SearchPage: React.FC<SearchPageProps> = ({ items }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchQuery = query.toLowerCase();
    return items.filter(
      item =>
        item.title.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery) ||
        item.seller.name.toLowerCase().includes(searchQuery) ||
        item.location.toLowerCase().includes(searchQuery)
    );
  }, [items, query]);

  return (
    <>
      <SEOHead
        title={`Search results for "${query}" | CityMarket Local Marketplace`}
        description={`Found ${searchResults.length} items matching "${query}". Browse local marketplace results for ${query} on CityMarket.`}
        url={`${window.location.origin}/search?q=${encodeURIComponent(query)}`}
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
                  <Search className="w-6 h-6 text-gray-600" />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Search results for "{query}"
                    </h1>
                    <p className="text-sm text-gray-600">
                      {searchResults.length} item{searchResults.length !== 1 ? 's' : ''} found
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
          {!query.trim() ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Enter a search term
              </h3>
              <p className="text-gray-500 mb-6">
                Use the search bar above to find items in the marketplace.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Browse all items
              </button>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No results found for "{query}"
              </h3>
              <p className="text-gray-500 mb-6">
                Try different keywords or browse our categories.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Browse all categories
              </button>
            </div>
          ) : (
            <>
              {/* Search suggestions */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600">Related searches:</span>
                  {['electronics', 'furniture', 'clothing', 'automotive'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => navigate(`/search?q=${suggestion}`)}
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {searchResults.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};