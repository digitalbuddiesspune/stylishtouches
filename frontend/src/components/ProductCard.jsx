import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { Heart, Plus } from "lucide-react";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, wishlist, removeFromWishlist } = useContext(CartContext);

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  const toggleWishlist = () => {
    if (isWishlisted) removeFromWishlist(product._id);
    else addToWishlist(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  // Calculate prices for display
  const getDisplayPrices = () => {
    // Price is the discounted price (finalPrice)
    const discountedPrice = Number(product.price || product.finalPrice || 0);
    
    // Original price (MRP)
    let originalPrice = Number(product.originalPrice || 0);
    const discountPercent = Number(product.discount || product.discountPercent || 0);
    
    // If originalPrice is not provided, calculate it from discounted price and discount
    if (!originalPrice && discountPercent > 0 && discountedPrice > 0) {
      originalPrice = Math.round(discountedPrice / (1 - discountPercent / 100));
    } else if (!originalPrice) {
      originalPrice = discountedPrice; // No discount, MRP equals discounted price
    }
    
    return { originalPrice, discountedPrice: Math.round(discountedPrice), discountPercent };
  };

  const { originalPrice, discountedPrice, discountPercent } = getDisplayPrices();

  // Use first image from images array (show only one image for contact lenses)
  const imageSrc = Array.isArray(product.images) ? (product.images[0] || "/placeholder.jpg") : (product.images || "/placeholder.jpg");

  const isContactLens = product._type === 'contactLens' || product.category === 'Contact Lenses';

  // Render stars for ratings
  const renderStars = (rating) => {
    const stars = Math.round(rating || 0);
    return (
      <span className="text-yellow-500 font-semibold text-sm">
        {"★".repeat(stars) + "☆".repeat(5 - stars)} ({(rating || 0).toFixed(1)})
      </span>
    );
  };

  return (
    <div className="card-product relative h-full flex flex-col">
      {/* Heart icon overlay */}
      <div 
        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 cursor-pointer p-1.5 sm:p-2 rounded-full shadow-md hover:scale-110 transition-all duration-200" 
        style={{ backgroundColor: 'var(--bg-secondary)' }}
        onClick={toggleWishlist}
      >
        <Heart 
          color={isWishlisted ? "#ef4444" : "#6b7280"} 
          fill={isWishlisted ? "#ef4444" : "none"} 
          size={16}
          className="sm:w-5 sm:h-5 transition-all duration-200"
        />
      </div>

      {/* Product Image */}
      <div className="relative mb-2 sm:mb-3 md:mb-4 px-2 sm:px-3 md:px-4 pt-2 sm:pt-3 md:pt-4">
        <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={imageSrc}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onClick={() => navigate(`/product/${product._id}`)}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4">
        <h3 
          className="text-optic-heading text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 cursor-pointer hover:opacity-80 transition-opacity line-clamp-2"
          style={{ color: 'var(--text-primary)' }}
          onClick={() => navigate(`/product/${product._id}`)}
        >
          {product.title}
        </h3>
        
        <p className="text-optic-body text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4" style={{ color: 'var(--text-secondary)' }}>
          {product.category || 'vision'}
        </p>
        
        <div className="text-optic-heading text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4" style={{ color: 'var(--text-primary)' }}>
          ₹{discountedPrice}
          {originalPrice > discountedPrice && (
            <span className="text-xs sm:text-sm font-normal line-through ml-1 sm:ml-2" style={{ color: 'var(--text-secondary)' }}>
              ₹{originalPrice}
            </span>
          )}
        </div>
        
        {/* Add Button */}
        <button 
          onClick={() => addToCart(product)}
          className="btn-accent mx-auto mt-auto w-8 h-8 sm:w-10 sm:h-10"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
