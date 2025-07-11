import React, { useState } from 'react';
import { Search, Plus, Star } from 'lucide-react';
import type { Product } from '../types';

interface ProductSearchProps {
  onAddToCart: (product: Omit<Product, 'id'>) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock product data
  const products: Product[] = [
    {
      id: '1',
      name: 'Organic Bananas',
      price: 2.99,
      image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fresh Produce',
      rating: 4.5,
      reviews: 128
    },
    {
      id: '2',
      name: 'Whole Grain Bread',
      price: 3.49,
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Bakery',
      rating: 4.2,
      reviews: 89
    },
    {
      id: '3',
      name: 'Greek Yogurt',
      price: 4.99,
      image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Dairy',
      rating: 4.7,
      reviews: 203
    },
    {
      id: '4',
      name: 'Avocados (Pack of 4)',
      price: 5.99,
      image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fresh Produce',
      rating: 4.3,
      reviews: 156
    },
    {
      id: '5',
      name: 'Pasta Sauce',
      price: 2.49,
      image: 'https://images.pexels.com/photos/6287523/pexels-photo-6287523.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pantry',
      rating: 4.1,
      reviews: 95
    },
    {
      id: '6',
      name: 'Chicken Breast',
      price: 8.99,
      image: 'https://images.pexels.com/photos/616401/pexels-photo-616401.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Meat',
      rating: 4.4,
      reviews: 142
    }
  ];

  const categories = ['all', 'Fresh Produce', 'Bakery', 'Dairy', 'Pantry', 'Meat'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    onAddToCart({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating,
      reviews: product.reviews
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Products to Cart</h2>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <span className="text-lg font-bold text-blue-600">${product.price}</span>
              </div>
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{product.category}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;