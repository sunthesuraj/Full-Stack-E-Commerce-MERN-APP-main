/* eslint-disable react/prop-types */
import { useState } from 'react';

const ProductListFilters = ({ onFilterChange }) => {
    const [sortBy, setSortBy] = useState('default');
    const [ratingFilter, setRatingFilter] = useState([]);
    const [discountFilter, setDiscountFilter] = useState([]);
  
    const handleSortByChange = (value) => {
      setSortBy(value);
      onFilterChange({ sortBy: value, rating: ratingFilter, discount: discountFilter }); 
    };
  
    const handleRatingChange = (event) => {
      const newRating = event.target.checked
        ? [...ratingFilter, parseInt(event.target.value)]
        : ratingFilter.filter((r) => r !== parseInt(event.target.value));
      setRatingFilter(newRating);
      onFilterChange({ sortBy: sortBy, rating: newRating, discount: discountFilter }); 
    };
  
    const handleDiscountChange = (event) => {
      const newDiscount = event.target.checked
        ? [...discountFilter, parseInt(event.target.value)]
        : discountFilter.filter((d) => d !== parseInt(event.target.value));
      setDiscountFilter(newDiscount);
      onFilterChange({ sortBy: sortBy, rating: ratingFilter, discount: newDiscount }); 
    };
  

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-md lg:text-lg text-center font-semibold mb-4">Filters</h2>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Sort By:</h3>
        <div className="flex md:flex-col gap-2 text-sm">
          <button 
            className={`border p-2 rounded ${sortBy === 'default' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
            onClick={() => handleSortByChange('default')}
          >
            Default
          </button>
          <button 
            className={`border p-2 rounded ${sortBy === 'price-asc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
            onClick={() => handleSortByChange('price-asc')}
          >
            Price: Low to High
          </button>
          <button 
            className={`border p-2 rounded ${sortBy === 'price-desc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
            onClick={() => handleSortByChange('price-desc')}
          >
            Price: High to Low
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Rating</h3>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              value={5} 
              checked={ratingFilter.includes(5)} 
              onChange={handleRatingChange} 
              className="mr-2" 
            />
            <label className="text-sm text-gray-700">5 Stars</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              value={4} 
              checked={ratingFilter.includes(4)} 
              onChange={handleRatingChange} 
              className="mr-2" 
            />
            <label className="text-sm text-gray-700">4 Stars & Above</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              value={3} 
              checked={ratingFilter.includes(3)} 
              onChange={handleRatingChange} 
              className="mr-2" 
            />
            <label className="text-sm text-gray-700">3 Stars & Above</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              value={2} 
              checked={ratingFilter.includes(2)} 
              onChange={handleRatingChange} 
              className="mr-2" 
            />
            <label className="text-sm text-gray-700">2 Stars & Above</label>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Discount</h3>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              value={10} 
              checked={discountFilter.includes(10)} 
              onChange={handleDiscountChange} 
              className="mr-2" 
            />
            <label className="text-sm text-gray-700">10% & Above</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              value={20} 
              checked={discountFilter.includes(20)} 
              onChange={handleDiscountChange} 
              className="mr-2" 
            />
            <label className="text-sm text-gray-700">20% & Above</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              value={30} 
              checked={discountFilter.includes(30)} 
              onChange={handleDiscountChange} 
              className="mr-2" 
            />
            <label className="text-sm text-gray-700">30% & Above</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              value={50} 
              checked={discountFilter.includes(50)} 
              onChange={handleDiscountChange} 
              className="mr-2" 
            />
            <label className="text-sm text-gray-700">50% & Above</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              value={70} 
              checked={discountFilter.includes(70)} 
              onChange={handleDiscountChange} 
              className="mr-2" 
            />
            <label className="text-sm text-gray-700">70% & Above</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListFilters;