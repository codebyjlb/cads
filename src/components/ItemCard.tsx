import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, MapPin, Clock, Eye } from 'lucide-react';
import { MarketplaceItem } from '../types';

interface ItemCardProps {
  item: MarketplaceItem;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  // const getConditionColor = (condition: string) => {
  //   switch (condition) {
  //     case 'new': return 'bg-green-100 text-green-800';
  //     case 'like-new': return 'bg-blue-100 text-blue-800';
  //     case 'good': return 'bg-yellow-100 text-yellow-800';
  //     case 'fair': return 'bg-orange-100 text-orange-800';
  //     default: return 'bg-gray-100 text-gray-800';
  //   }
  // };

  const handleClick = () => {
    navigate(`/item/${item.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group hover:scale-105"
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-32 object-cover"
        />
        {/* <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-colors">
          <Heart className="w-4 h-4 text-gray-600" />
        </button> */}
        <div className="absolute bottom-3 left-3">
          {/* <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(item.condition)}`}>
            {item.condition}
          </span> */}
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm">
            {item.title}
          </h3>
          <span className="text-sm font-bold text-blue-600 ml-2 whitespace-nowrap">
            ₱{item.price.toLocaleString()}
          </span>
        </div>
        
        <p className="text-gray-600 text-xs line-clamp-2 mb-3">
          {item.description}
        </p>
        
        <div className="flex items-center justify-end text-xs text-gray-500 mb-2">
          {/* <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>{item.location}</span>
          </div> */}
          {/* <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatTimeAgo(item.postedAt)}</span>
          </div>
        </div> */}
        <div className="flex items-center space-x-1">
          <Eye className="w-3 h-3" />
          <span>{Math.floor(Math.random() * 500)} views</span>
        </div>

        </div>
        
        {/* <div className="flex items-center pt-2 border-t border-gray-100">
          <img
            src={item.seller.avatar}
            alt={item.seller.name}
            className="w-5 h-5 rounded-full"
          />
          <span className="ml-2 text-xs text-gray-700 truncate">{item.seller.name}</span>
          <div className="flex items-center ml-auto">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="ml-1 text-xs text-gray-600">{item.seller.rating}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};