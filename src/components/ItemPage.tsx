import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Clock, Shield, MessageCircle, Phone, Heart, Share2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { MarketplaceItem } from '../types';
import { SEOHead } from './SEOHead';

interface ItemPageProps {
  items: MarketplaceItem[];
}

export const ItemPage: React.FC<ItemPageProps> = ({ items }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  const item = items.find(item => item.id === id);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h2>
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

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'like-new': return 'bg-blue-100 text-blue-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // For demo purposes, let's create multiple images from the single image
  const itemImages = item ? [
    item.image,
    'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=500',
  ] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % itemImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + itemImages.length) % itemImages.length);
  };


  return (
    <>
      <SEOHead
        title={`${item.title} - $${item.price.toLocaleString()} | CityMarket`}
        description={`${item.description.substring(0, 160)}...`}
        image={item.image}
        url={`${window.location.origin}/item/${item.id}`}
        type="product"
        price={item.price}
        condition={item.condition}
        category={item.category}
        availability="in_stock"
      />
      <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to marketplace</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative overflow-hidden">
              <img
                src={itemImages[currentImageIndex]}
                alt={item.title}
                className="w-full h-96 lg:h-[500px] object-cover transition-all duration-500 ease-in-out transform"
                style={{
                  transform: `translateX(-${currentImageIndex * 0}%)`,
                }}
              />
              
              {/* Image Navigation - only show if more than 1 image */}
              {itemImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {itemImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-white'
                            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {/* Image counter */}
              {itemImages.length > 1 && (
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm transition-all duration-300">
                  {currentImageIndex + 1} / {itemImages.length}
                </div>
              )}
            </div>
            
            {/* Thumbnail strip - only show if more than 1 image */}
            {itemImages.length > 1 && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                  {itemImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                        index === currentImageIndex
                          ? 'border-blue-500'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${item.title} ${index + 1}`}
                        className="w-full h-full object-cover transition-all duration-200"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Description Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Details</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </div>
        </div>

        {/* Right Column - Item Info */}
        <div className="space-y-6">
          {/* Price and Title */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h1>
                <div className="text-3xl font-bold text-blue-600 mb-3">
                  ₱{item.price.toLocaleString()}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Condition</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(item.condition)}`}>
                  {item.condition}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium text-gray-900 capitalize">{item.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Posted</span>
                <span className="font-medium text-gray-900">{formatTimeAgo(item.postedAt)}</span>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Seller information</h3>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={item.seller.avatar}
                alt={item.seller.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{item.seller.name}</h4>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{item.seller.rating} rating</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Identity verified</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{item.location}</span>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Message seller</span>
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call seller</span>
            </button>
          </div>

          {/* Safety Tips */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Safety tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Meet in a public place</li>
              <li>• Check the item before you buy</li>
              <li>• Pay when you collect</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};