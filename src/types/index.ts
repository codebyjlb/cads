export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  seller: {
    name: string;
    avatar: string;
    rating: number;
  };
  location: string;
  postedAt: Date;
  condition: 'new' | 'like-new' | 'good' | 'fair';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}