import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CategoryBar from "./CategoryBar";
import { CartContext } from "../context/CartContext";
import { Search, X, ChevronDown, ShoppingBag, Menu, Plus } from "lucide-react";
import { categories } from "../data/categories";

// Women's Products Dropdown Component
const WomensProductsDropdown = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isWomensProductsOpen, setIsWomensProductsOpen] = useState(false);
  const navigate = useNavigate();
  const womensProductsRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (womensProductsRef.current && !womensProductsRef.current.contains(event.target)) {
        setIsWomensProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProductSelect = (productType, subcategory = null) => {
    setSelectedProduct(productType);
    setIsWomensProductsOpen(false);
    
    if (subcategory) {
      const params = new URLSearchParams({ subCategory: subcategory.toLowerCase() });
      navigate(`/category/${encodeURIComponent(productType)}?${params.toString()}`);
    } else {
      navigate(`/category/${encodeURIComponent(productType)}`);
    }
  };

  // Handle clicking on the Women's Products button itself
  const handleWomensProductsClick = () => {
    if (!isWomensProductsOpen) {
      setIsWomensProductsOpen(true);
    } else {
      setIsWomensProductsOpen(false);
    }
  };

  const accessoriesSubcategories = ["Necklace", "Bracelets", "Tie", "Anklets", "Earings", "Belts", "Scarfs", "Watches"];
  const bagsSubcategories = ["Handbag", "Sling Bag", "Tote Bag", "Duffle Bag", "Wallet", "Laptop Bag", "Travel Bag", "Clutch", "Shoulder Bag"];
  const shoesSubcategories = ["Heels", "Flats", "Sneakers", "Boots", "Sandals"];

  return (
    <div className="relative" ref={womensProductsRef}>
      <button
        onClick={handleWomensProductsClick}
        className="group flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl hover:border-sky-400 hover:bg-sky-50 hover:shadow-lg transition-all duration-300 text-xs sm:text-sm font-medium text-gray-700 shadow-sm min-w-[100px] sm:min-w-[160px] justify-between"
      >
        <span className="group-hover:text-sky-700 transition-colors truncate">
          <span>Women's Products</span>
        </span>
        <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-sky-600 transition-all duration-200 flex-shrink-0 ${isWomensProductsOpen ? 'rotate-180' : ''}`} />
      </button>
      {isWomensProductsOpen && (
        <div className="absolute top-full left-0 mt-2 w-auto min-w-[600px] sm:min-w-[700px] md:min-w-[800px] bg-white/95 backdrop-blur-lg border border-gray-200 rounded-lg sm:rounded-xl shadow-2xl z-[100]">
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              {/* Accessories Section */}
              <div className="min-w-0">
                <button
                  onClick={() => handleProductSelect("Accessories")}
                  className="w-full text-left px-3 py-2 hover:bg-gradient-to-r hover:from-sky-50 hover:to-indigo-50 hover:text-sky-700 transition-all duration-200 text-sm font-semibold rounded-md group mb-2"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">All Accessories</span>
                </button>
                <div className="space-y-1">
                  {accessoriesSubcategories.map((subcat) => (
                    <button
                      key={subcat}
                      onClick={() => handleProductSelect("Accessories", subcat)}
                      className="w-full text-left px-3 py-1.5 hover:bg-gradient-to-r hover:from-sky-50 hover:to-indigo-50 hover:text-sky-700 transition-all duration-200 text-xs rounded-md group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">{subcat}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Bags Section */}
              <div className="min-w-0 border-l border-gray-200 pl-4">
                <button
                  onClick={() => handleProductSelect("Bags")}
                  className="w-full text-left px-3 py-2 hover:bg-gradient-to-r hover:from-sky-50 hover:to-indigo-50 hover:text-sky-700 transition-all duration-200 text-sm font-semibold rounded-md group mb-2"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">All Bags</span>
                </button>
                <div className="space-y-1">
                  {bagsSubcategories.map((subcat) => (
                    <button
                      key={subcat}
                      onClick={() => handleProductSelect("Bags", subcat)}
                      className="w-full text-left px-3 py-1.5 hover:bg-gradient-to-r hover:from-sky-50 hover:to-indigo-50 hover:text-sky-700 transition-all duration-200 text-xs rounded-md group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">{subcat}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Women's Shoes Section */}
              <div className="min-w-0 border-l border-gray-200 pl-4">
                <button
                  onClick={() => handleProductSelect("Women's Shoes")}
                  className="w-full text-left px-3 py-2 hover:bg-gradient-to-r hover:from-sky-50 hover:to-indigo-50 hover:text-sky-700 transition-all duration-200 text-sm font-semibold rounded-md group mb-2"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">All Women's Shoes</span>
                </button>
                <div className="space-y-1">
                  {shoesSubcategories.map((subcat) => (
                    <button
                      key={subcat}
                      onClick={() => handleProductSelect("Women's Shoes", subcat)}
                      className="w-full text-left px-3 py-1.5 hover:bg-gradient-to-r hover:from-sky-50 hover:to-indigo-50 hover:text-sky-700 transition-all duration-200 text-xs rounded-md group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">{subcat}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Compact Category Dropdowns Component
const CategoryDropdowns = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const navigate = useNavigate();
  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (subCategoryRef.current && !subCategoryRef.current.contains(event.target)) {
        setIsSubCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (catKey) => {
    setSelectedCategory(catKey);
    setSelectedSubCategory("");
    setIsCategoryOpen(false);
    setIsSubCategoryOpen(false);
    const categoryTitle = categories[catKey].title;
    navigate(`/category/${encodeURIComponent(categoryTitle)}`);
  };

  const handleSubCategorySelect = (field, value) => {
    setSelectedSubCategory(`${field}-${value}`);
    setIsSubCategoryOpen(false);
    const categoryTitle = categories[selectedCategory].title;
    const params = new URLSearchParams({ [field]: value });
    navigate(`/category/${encodeURIComponent(categoryTitle)}?${params.toString()}`);
  };

  const currentCategory = selectedCategory ? categories[selectedCategory] : null;
  const subCategories = currentCategory ? Object.entries(currentCategory.fields) : [];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Category Dropdown */}
      <div className="relative" ref={categoryRef}>
        <button
          onClick={() => {
            setIsCategoryOpen(!isCategoryOpen);
            setIsSubCategoryOpen(false);
          }}
          className="group flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:border-sky-400 hover:bg-sky-50 hover:shadow-lg transition-all duration-300 text-sm font-medium text-gray-700 shadow-sm min-w-[140px] justify-between"
        >
          <span className="group-hover:text-sky-700 transition-colors">{selectedCategory ? categories[selectedCategory].title : "Glasses"}</span>
          <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-sky-600 transition-all duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
        </button>
        {isCategoryOpen && (
          <div className="absolute top-full left-0 mt-2 w-52 bg-white/95 backdrop-blur-lg border border-gray-200 rounded-xl shadow-2xl z-[100] max-h-80 overflow-y-auto">
            <div className="p-2">
              {Object.keys(categories).filter(key => ['eyeglasses', 'sunglasses', 'computerglasses', 'contactlenses'].includes(key)).map((key) => (
                <button
                  key={key}
                  onClick={() => handleCategorySelect(key)}
                  className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-sky-50 hover:to-indigo-50 hover:text-sky-700 transition-all duration-200 text-sm font-medium rounded-lg group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">{categories[key].title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sub-Category Dropdown (only shown if category is selected) */}
      {selectedCategory && subCategories.length > 0 && (
        <div className="relative" ref={subCategoryRef}>
          <button
            onClick={() => {
              setIsSubCategoryOpen(!isSubCategoryOpen);
              setIsCategoryOpen(false);
            }}
            className="group flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:border-sky-400 hover:bg-sky-50 hover:shadow-lg transition-all duration-300 text-sm font-medium text-gray-700 shadow-sm min-w-[140px] justify-between"
          >
            <span className="group-hover:text-sky-700 transition-colors">
              {selectedSubCategory
                ? subCategories.find(([field]) => selectedSubCategory.startsWith(field))?.[0] || "Sub-Category"
                : "Sub-Category"}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-sky-600 transition-all duration-200 ${isSubCategoryOpen ? 'rotate-180' : ''}`} />
          </button>
          {isSubCategoryOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-lg border border-gray-200 rounded-xl shadow-2xl z-[100] max-h-96 overflow-y-auto">
              <div className="p-2">
                {subCategories.map(([field, values]) => (
                  <div key={field} className="mb-2 last:mb-0">
                    <div className="px-4 py-2 bg-gradient-to-r from-gray-50 to-sky-50 text-xs font-semibold text-gray-600 uppercase rounded-lg mb-1">
                      {field}
                    </div>
                    <div className="space-y-1">
                      {values.map((value) => (
                        <button
                          key={value}
                          onClick={() => handleSubCategorySelect(field, value)}
                          className="w-full text-left px-6 py-2.5 hover:bg-gradient-to-r hover:from-sky-50 hover:to-indigo-50 hover:text-sky-700 transition-all duration-200 text-sm rounded-lg group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">{value}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const { cart, wishlist } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) {
      navigate("/home");
      setSearchTerm("");
      return;
    }

    const lower = term.toLowerCase();

    // 1) Match by category title
    const matchedCategory = Object.values(categories).find((cat) =>
      cat.title.toLowerCase().includes(lower)
    );
    if (matchedCategory) {
      navigate(`/category/${encodeURIComponent(matchedCategory.title)}`);
      setSearchTerm("");
      return;
    }

    // 2) Match by any subcategory value (field -> values)
    for (const [, cat] of Object.entries(categories)) {
      const fields = cat.fields || {};
      for (const [field, values] of Object.entries(fields)) {
        const found = values.find((v) => v.toLowerCase() === lower || v.toLowerCase().includes(lower));
        if (found) {
          const params = new URLSearchParams({ [field]: found });
          navigate(`/category/${encodeURIComponent(cat.title)}?${params.toString()}`);
          setSearchTerm("");
          return;
        }
      }
    }

    // 3) Fallback to product search on Shop page
    navigate(`/shop?search=${encodeURIComponent(term)}`);
    setSearchTerm("");
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // Only close if search term is empty
        if (!searchTerm.trim()) {
          setIsSearchOpen(false);
        }
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isSearchOpen, searchTerm]);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      const input = searchRef.current.querySelector('input');
      if (input) {
        setTimeout(() => input.focus(), 100);
      }
    }
  }, [isSearchOpen]);

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(e);
    setIsSearchOpen(false);
  };

  return (
    <header className="w-full z-50  sticky bottom-10 top-0" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Top Navbar (cart/wishlist etc.) */}
      <Navbar 
        cartCount={cart.length} 
        wishlistCount={wishlist.length} 
        onSearchClick={() => setIsSearchOpen(true)}
        isSearchOpen={isSearchOpen}
        onSearchClose={handleSearchClose}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Search Bar Below Navbar - Mobile Only */}
      {isSearchOpen && (
        <div className="md:hidden border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div className="container-optic py-3">
            <form 
              onSubmit={handleSearchSubmit} 
              className="w-full"
              ref={searchRef}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                </div>
                <input
                  id="search-mobile"
                  name="search"
                  type="text"
                  placeholder="Search for eyewear, brands..."
                  className="block w-full pl-10 pr-20 py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-sm placeholder-gray-400 transition-all duration-300"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="p-1.5 hover:opacity-70 transition-opacity rounded-lg hover:bg-gray-100"
                      style={{ color: 'var(--text-secondary)' }}
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleSearchClose}
                    className="p-1.5 hover:opacity-70 transition-opacity rounded-lg hover:bg-gray-100"
                    style={{ color: 'var(--text-secondary)' }}
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Section - Desktop Only */}
      <div className="hidden md:block border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="container-optic py-3 sm:py-4">
          <div className="flex justify-center items-center gap-2 md:gap-3 flex-wrap">
            <WomensProductsDropdown />
            <CategoryDropdowns />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="container-optic py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-optic-body text-sm font-medium uppercase tracking-wider"
                style={{ color: 'var(--text-primary)' }}
              >
                HOME
              </Link>
              <Link 
                to="/shop" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-optic-body text-sm font-medium uppercase tracking-wider"
                style={{ color: 'var(--text-primary)' }}
              >
                SHOP
              </Link>
              <Link 
                to="/category/New" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-optic-body text-sm font-medium uppercase tracking-wider"
                style={{ color: 'var(--text-primary)' }}
              >
                NEW
              </Link>
              <Link 
                to="/category/Sale" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-optic-body text-sm font-medium uppercase tracking-wider"
                style={{ color: 'var(--text-primary)' }}
              >
                SALE
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
