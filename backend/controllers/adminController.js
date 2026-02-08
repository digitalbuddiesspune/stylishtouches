import Product from "../models/Product.js";
import Order from "../models/Order.js";
import ContactLens from "../models/ContactLens.js";
import Accessory from "../models/Accessory.js";
import Bag from "../models/Bag.js";
import MensShoe from "../models/MensShoe.js";
import WomensShoe from "../models/WomensShoe.js";

// Helper function to normalize Accessory to Product-like format
function normalizeAccessory(acc) {
  const doc = acc._doc || acc;
  let imagesArray = [];
  if (Array.isArray(doc.images) && doc.images.length > 0) {
    imagesArray = doc.images.filter(img => img && typeof img === 'string' && img.trim() !== '');
  }
  if (imagesArray.length === 0 && doc.thumbnail && typeof doc.thumbnail === 'string' && doc.thumbnail.trim() !== '') {
    imagesArray = [doc.thumbnail];
  }
  
  // Calculate original price (MRP)
  const finalPrice = doc.finalPrice || doc.price || 0;
  const discountPercent = doc.discountPercent || 0;
  let originalPrice = doc.originalPrice;
  if (!originalPrice && discountPercent > 0 && finalPrice > 0) {
    originalPrice = Math.round(finalPrice / (1 - discountPercent / 100));
  } else if (!originalPrice) {
    originalPrice = finalPrice;
  }

  return {
    _id: doc._id,
    title: doc.name || '',
    price: finalPrice,
    originalPrice: originalPrice,
    description: doc.description || '',
    category: doc.category || "Accessories",
    subCategory: doc.subCategory,
    product_info: {
      brand: doc.brand || '',
      gender: doc.gender || '',
    },
    images: imagesArray,
    ratings: doc.rating || 0,
    discount: discountPercent,
    finalPrice: finalPrice,
    _type: 'accessory',
    thumbnail: doc.thumbnail,
    brand: doc.brand,
    name: doc.name
  };
}

// Helper function to normalize Bag to Product-like format
function normalizeBag(bag) {
  const doc = bag._doc || bag;
  let imagesArray = [];
  if (Array.isArray(doc.images) && doc.images.length > 0) {
    imagesArray = doc.images.filter(img => img && typeof img === 'string' && img.trim() !== '');
  }
  
  // Calculate original price (MRP)
  const finalPrice = doc.finalPrice || doc.price || 0;
  const discountPercent = doc.discountPercent || 0;
  let originalPrice = doc.originalPrice;
  if (!originalPrice && discountPercent > 0 && finalPrice > 0) {
    originalPrice = Math.round(finalPrice / (1 - discountPercent / 100));
  } else if (!originalPrice) {
    originalPrice = finalPrice;
  }

  return {
    _id: doc._id,
    title: doc.name || '',
    price: finalPrice,
    originalPrice: originalPrice,
    description: doc.description || '',
    category: "Bags",
    subCategory: doc.category,
    product_info: {
      brand: doc.brand || '',
      gender: doc.gender || '',
    },
    images: imagesArray,
    ratings: doc.rating || 0,
    discount: discountPercent,
    finalPrice: finalPrice,
    _type: 'bag',
    brand: doc.brand,
    name: doc.name
  };
}

// Helper function to normalize MensShoe to Product-like format
function normalizeMensShoe(shoe) {
  const doc = shoe._doc || shoe;
  let imagesArray = [];
  if (Array.isArray(doc.images) && doc.images.length > 0) {
    imagesArray = doc.images.filter(img => img && typeof img === 'string' && img.trim() !== '');
  }
  
  if (imagesArray.length === 0 && doc.Images) {
    if (doc.Images.image1) imagesArray.push(doc.Images.image1);
    if (doc.Images.image2) imagesArray.push(doc.Images.image2);
    if (Array.isArray(doc.Images.additionalImages)) {
      imagesArray.push(...doc.Images.additionalImages.filter(img => img && typeof img === 'string' && img.trim() !== ''));
    }
  }
  
  if (imagesArray.length === 0 && doc.thumbnail && typeof doc.thumbnail === 'string' && doc.thumbnail.trim() !== '') {
    imagesArray = [doc.thumbnail];
  }
  
  // Calculate original price (MRP)
  const finalPrice = doc.finalPrice || doc.price || 0;
  const discountPercent = doc.discountPercent || 0;
  let originalPrice = doc.originalPrice;
  if (!originalPrice && discountPercent > 0 && finalPrice > 0) {
    originalPrice = Math.round(finalPrice / (1 - discountPercent / 100));
  } else if (!originalPrice) {
    originalPrice = finalPrice;
  }

  return {
    _id: doc._id,
    title: doc.title || '',
    price: finalPrice,
    originalPrice: originalPrice,
    description: doc.description || '',
    category: doc.category || "Men's Shoes",
    subCategory: doc.subCategory || '',
    subSubCategory: doc.subSubCategory || '',
    product_info: {
      brand: doc.product_info?.brand || '',
      gender: doc.product_info?.gender || 'Men',
      color: doc.product_info?.color || '',
    },
    images: imagesArray,
    ratings: doc.rating || 0,
    discount: discountPercent,
    finalPrice: finalPrice,
    _type: 'mensShoe',
    stock: doc.stock,
    inStock: doc.inStock
  };
}

// Helper function to normalize WomensShoe to Product-like format
function normalizeWomensShoe(shoe) {
  const doc = shoe._doc || shoe;
  let imagesArray = [];
  if (Array.isArray(doc.images) && doc.images.length > 0) {
    imagesArray = doc.images.filter(img => img && typeof img === 'string' && img.trim() !== '');
  }
  
  if (imagesArray.length === 0 && doc.Images) {
    if (doc.Images.image1) imagesArray.push(doc.Images.image1);
    if (doc.Images.image2) imagesArray.push(doc.Images.image2);
    if (Array.isArray(doc.Images.additionalImages)) {
      imagesArray.push(...doc.Images.additionalImages.filter(img => img && typeof img === 'string' && img.trim() !== ''));
    }
  }
  
  if (imagesArray.length === 0 && doc.thumbnail && typeof doc.thumbnail === 'string' && doc.thumbnail.trim() !== '') {
    imagesArray = [doc.thumbnail];
  }
  
  // Calculate original price (MRP)
  const finalPrice = doc.finalPrice || doc.price || 0;
  const discountPercent = doc.discountPercent || 0;
  let originalPrice = doc.originalPrice;
  if (!originalPrice && discountPercent > 0 && finalPrice > 0) {
    originalPrice = Math.round(finalPrice / (1 - discountPercent / 100));
  } else if (!originalPrice) {
    originalPrice = finalPrice;
  }

  return {
    _id: doc._id,
    title: doc.title || '',
    price: finalPrice,
    originalPrice: originalPrice,
    description: doc.description || '',
    category: doc.category || "Women's Shoes",
    subCategory: doc.subCategory || '',
    subSubCategory: doc.subSubCategory || '',
    product_info: {
      brand: doc.product_info?.brand || '',
      gender: doc.product_info?.gender || 'Women',
      color: doc.product_info?.color || '',
    },
    images: imagesArray,
    ratings: doc.rating || 0,
    discount: discountPercent,
    finalPrice: finalPrice,
    _type: 'womensShoe',
    stock: doc.stock,
    inStock: doc.inStock
  };
}

// Category display name to Product model enum mapping
const glassesCategoryMap = {
  'Eyeglasses': 'eyeglasses',
  'Sunglasses': 'sunglasses',
  'Computer Glasses': 'computerglasses',
  'Contact Lenses': 'contactlenses',
};

export const createProduct = async (req, res) => {
  try {
    const body = { ...req.body };

    // Normalize images
    let imagesArray = [];
    if (Array.isArray(body.images)) imagesArray = body.images.filter(Boolean);
    if (!imagesArray.length && body.Images) {
      const { image1, image2 } = body.Images || {};
      imagesArray = [image1, image2].filter(Boolean);
    }
    if (!imagesArray.length && body.image1) {
      imagesArray = [body.image1, body.image2].filter(Boolean);
    }

    const category = body.category;

    // Route to correct collection based on category
    if (category === 'Accessories') {
      const payload = {
        name: body.title,
        brand: body.product_info?.brand || 'Unknown',
        category: 'Accessories',
        subCategory: body.subCategory ? body.subCategory.toLowerCase() : 'necklace',
        gender: body.product_info?.gender ? body.product_info.gender.toLowerCase() : 'unisex',
        price: parseFloat(body.price) || 0,
        originalPrice: parseFloat(body.price) || 0,
        finalPrice: parseFloat(body.price) || 0,
        images: imagesArray,
        thumbnail: imagesArray[0] || '',
        description: body.description || '',
        rating: parseFloat(body.ratings) || 0,
        discountPercent: parseFloat(body.discount) || 0,
      };
      const created = await Accessory.create(payload);
      return res.status(201).json(normalizeAccessory(created));
    }

    if (category === 'Bags') {
      const payload = {
        name: body.title,
        brand: body.product_info?.brand || 'Unknown',
        category: body.subCategory ? body.subCategory.toLowerCase() : 'handbag',
        gender: body.product_info?.gender ? body.product_info.gender.toLowerCase() : 'unisex',
        price: parseFloat(body.price) || 0,
        originalPrice: parseFloat(body.price) || 0,
        finalPrice: parseFloat(body.price) || 0,
        images: imagesArray,
        description: body.description || '',
        rating: parseFloat(body.ratings) || 0,
        discountPercent: parseFloat(body.discount) || 0,
      };
      const created = await Bag.create(payload);
      return res.status(201).json(normalizeBag(created));
    }

    if (category === "Women's Shoes") {
      const payload = {
        title: body.title,
        price: parseFloat(body.price) || 0,
        originalPrice: parseFloat(body.price) || 0,
        finalPrice: parseFloat(body.price) || 0,
        description: body.description || '',
        category: "Women's Shoes",
        subCategory: body.subCategory || 'Heels',
        product_info: {
          brand: body.product_info?.brand || 'Unknown',
          gender: 'Women',
          color: body.product_info?.frameColor || '',
          outerMaterial: body.product_info?.frameMaterial || '',
          warranty: body.product_info?.warranty || '',
        },
        images: imagesArray,
        rating: parseFloat(body.ratings) || 0,
        discountPercent: parseFloat(body.discount) || 0,
      };
      const created = await WomensShoe.create(payload);
      return res.status(201).json(normalizeWomensShoe(created));
    }

    if (category === "Men's Shoes") {
      const payload = {
        title: body.title,
        price: parseFloat(body.price) || 0,
        originalPrice: parseFloat(body.price) || 0,
        finalPrice: parseFloat(body.price) || 0,
        description: body.description || '',
        category: "Men's Shoes",
        subCategory: body.subCategory || 'Formal',
        product_info: {
          brand: body.product_info?.brand || 'Unknown',
          gender: 'Men',
          color: body.product_info?.frameColor || '',
          outerMaterial: body.product_info?.frameMaterial || '',
          warranty: body.product_info?.warranty || '',
        },
        images: imagesArray,
        rating: parseFloat(body.ratings) || 0,
        discountPercent: parseFloat(body.discount) || 0,
      };
      const created = await MensShoe.create(payload);
      return res.status(201).json(normalizeMensShoe(created));
    }

    if (category === 'Contact Lenses') {
      const payload = {
        title: body.title,
        price: parseFloat(body.price) || 0,
        description: body.description || '',
        category: 'Contact Lenses',
        subCategory: body.subCategory || '',
        product_info: {
          brand: body.product_info?.brand || '',
          usageDuration: body.product_info?.usageDuration || 'Monthly',
          material: body.product_info?.frameMaterial || '',
          warranty: body.product_info?.warranty || '',
        },
        images: imagesArray,
        ratings: parseFloat(body.ratings) || 0,
        discount: parseFloat(body.discount) || 0,
      };
      const created = await ContactLens.create(payload);
      return res.status(201).json(created);
    }

    // Default: glasses products (Eyeglasses, Sunglasses, Computer Glasses)
    const mappedCategory = glassesCategoryMap[category] || category.toLowerCase().replace(/\s+/g, '');
    const payload = {
      title: body.title,
      price: parseFloat(body.price) || 0,
      description: body.description || '',
      category: mappedCategory,
      subCategory: body.subCategory || '',
      subSubCategory: body.subSubCategory || '',
      product_info: body.product_info || {},
      images: imagesArray,
      ratings: parseFloat(body.ratings) || 0,
      discount: parseFloat(body.discount) || 0,
    };
    const created = await Product.create(payload);
    return res.status(201).json(created);
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Duplicate key error", error: error?.message });
    }
    console.error("Create product error:", error);
    return res.status(400).json({ message: "Error creating product", error: error.message });
  }
};

export const listAllProducts = async (req, res) => {
  try {
    // Get ALL products from all collections for admin dashboard
    const [products, contactLenses, accessories, bags, mensShoes, womensShoes] = await Promise.all([
      Product.find({}).sort({ createdAt: -1 }).lean(),
      ContactLens.find({}).sort({ createdAt: -1 }).lean(),
      Accessory.find({}).sort({ createdAt: -1 }).lean(),
      Bag.find({}).sort({ createdAt: -1 }).lean(),
      MensShoe.find({}).sort({ createdAt: -1 }).lean(),
      WomensShoe.find({}).sort({ createdAt: -1 }).lean(),
    ]);

    // Tag and normalize each item
    const taggedProducts = products.map((p) => ({ ...p, _type: "product" }));
    const taggedContactLenses = contactLenses.map((c) => ({ ...c, _type: "contactLens" }));
    const normalizedAccessories = accessories.map(normalizeAccessory);
    const normalizedBags = bags.map(normalizeBag);
    const normalizedMensShoes = mensShoes.map(normalizeMensShoe);
    const normalizedWomensShoes = womensShoes.map(normalizeWomensShoe);

    // Combine all products and sort by creation date (newest first)
    const allProducts = [
      ...taggedProducts,
      ...taggedContactLenses,
      ...normalizedAccessories,
      ...normalizedBags,
      ...normalizedMensShoes,
      ...normalizedWomensShoes
    ].sort((a, b) => {
      // Sort by createdAt if available, otherwise by _id
      const dateA = a.createdAt ? new Date(a.createdAt) : null;
      const dateB = b.createdAt ? new Date(b.createdAt) : null;
      if (dateA && dateB) {
        return dateB - dateA; // Newest first
      }
      if (dateA) return -1;
      if (dateB) return 1;
      // Fallback to _id comparison
      return (b._id || '').toString().localeCompare((a._id || '').toString());
    });

    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };

    // Normalize images
    let imagesArray = [];
    if (Array.isArray(body.images)) imagesArray = body.images.filter(Boolean);
    if (!imagesArray.length && body.Images) {
      const { image1, image2 } = body.Images || {};
      imagesArray = [image1, image2].filter(Boolean);
    }
    if (!imagesArray.length && body.image1) {
      imagesArray = [body.image1, body.image2].filter(Boolean);
    }

    // Helper to remove undefined fields
    const clean = (obj) => {
      const cleaned = { ...obj };
      Object.keys(cleaned).forEach((key) => cleaned[key] === undefined && delete cleaned[key]);
      return cleaned;
    };

    // Helper to safely extract existing product_info as plain object
    const getExistingProductInfo = (doc) => {
      if (!doc.product_info) return {};
      if (typeof doc.product_info.toObject === 'function') return doc.product_info.toObject();
      return { ...doc.product_info };
    };

    // 1) Try Product collection (glasses)
    let existing = await Product.findById(id);
    if (existing) {
      // Map category display name to enum value
      const mappedCategory = glassesCategoryMap[body.category] || body.category;
      const updateData = clean({
        title: body.title,
        price: parseFloat(body.price) || undefined,
        description: body.description,
        category: mappedCategory,
        subCategory: body.subCategory || undefined,
        subSubCategory: body.subSubCategory || undefined,
        product_info: body.product_info || undefined,
        images: imagesArray.length > 0 ? imagesArray : undefined,
        ratings: body.ratings != null ? parseFloat(body.ratings) : undefined,
        discount: body.discount != null ? parseFloat(body.discount) : undefined,
      });
      const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
      return res.json(updated);
    }

    // 2) Try ContactLens collection
    existing = await ContactLens.findById(id);
    if (existing) {
      // Merge product_info with existing to preserve fields like usageDuration
      const existingInfo = getExistingProductInfo(existing);
      const mergedInfo = { ...existingInfo };
      if (body.product_info?.brand) mergedInfo.brand = body.product_info.brand;
      if (body.product_info?.warranty) mergedInfo.warranty = body.product_info.warranty;

      const updateData = clean({
        title: body.title,
        price: parseFloat(body.price) || undefined,
        description: body.description,
        subCategory: body.subCategory || undefined,
        product_info: mergedInfo,
        images: imagesArray.length > 0 ? imagesArray : undefined,
        ratings: body.ratings != null ? parseFloat(body.ratings) : undefined,
        discount: body.discount != null ? parseFloat(body.discount) : undefined,
      });
      // Don't update category (enum restricted to 'Contact Lenses')
      const updated = await ContactLens.findByIdAndUpdate(id, updateData, { new: true });
      return res.json(updated);
    }

    // 3) Try Accessory collection
    existing = await Accessory.findById(id);
    if (existing) {
      const price = parseFloat(body.price);
      const discount = parseFloat(body.discount) || 0;
      const finalPrice = discount > 0 ? price - (price * discount / 100) : price;

      const updateData = clean({
        name: body.title,
        price: !isNaN(price) ? price : undefined,
        description: body.description,
        subCategory: body.subCategory ? body.subCategory.toLowerCase() : undefined,
        brand: body.product_info?.brand || undefined,
        gender: body.product_info?.gender ? body.product_info.gender.toLowerCase() : undefined,
        images: imagesArray.length > 0 ? imagesArray : undefined,
        thumbnail: imagesArray.length > 0 ? imagesArray[0] : undefined,
        rating: body.ratings != null ? parseFloat(body.ratings) : undefined,
        discountPercent: !isNaN(discount) ? discount : undefined,
        finalPrice: !isNaN(finalPrice) ? finalPrice : undefined,
      });
      // Don't update category (it's immutable)
      const updated = await Accessory.findByIdAndUpdate(id, updateData, { new: true });
      return res.json(normalizeAccessory(updated));
    }

    // 4) Try Bag collection
    existing = await Bag.findById(id);
    if (existing) {
      const price = parseFloat(body.price);
      const discount = parseFloat(body.discount) || 0;
      const finalPrice = discount > 0 ? price - (price * discount / 100) : price;

      const updateData = clean({
        name: body.title,
        price: !isNaN(price) ? price : undefined,
        description: body.description,
        // Bag's 'category' field is the bag type (e.g. "handbag"), mapped from subCategory
        category: body.subCategory ? body.subCategory.toLowerCase() : undefined,
        brand: body.product_info?.brand || undefined,
        gender: body.product_info?.gender ? body.product_info.gender.toLowerCase() : undefined,
        images: imagesArray.length > 0 ? imagesArray : undefined,
        rating: body.ratings != null ? parseFloat(body.ratings) : undefined,
        discountPercent: !isNaN(discount) ? discount : undefined,
        finalPrice: !isNaN(finalPrice) ? finalPrice : undefined,
        originalPrice: !isNaN(price) ? price : undefined,
      });
      const updated = await Bag.findByIdAndUpdate(id, updateData, { new: true });
      return res.json(normalizeBag(updated));
    }

    // 5) Try MensShoe collection
    existing = await MensShoe.findById(id);
    if (existing) {
      const price = parseFloat(body.price);
      const discount = parseFloat(body.discount) || 0;
      const finalPrice = discount > 0 ? price - (price * discount / 100) : price;

      const existingInfo = getExistingProductInfo(existing);
      const mergedInfo = {
        ...existingInfo,
        brand: body.product_info?.brand || existingInfo.brand,
        gender: 'Men',
      };
      if (body.product_info?.warranty) mergedInfo.warranty = body.product_info.warranty;

      const updateData = clean({
        title: body.title,
        price: !isNaN(price) ? price : undefined,
        description: body.description,
        subCategory: body.subCategory || undefined,
        subSubCategory: body.subSubCategory || undefined,
        product_info: mergedInfo,
        images: imagesArray.length > 0 ? imagesArray : undefined,
        rating: body.ratings != null ? parseFloat(body.ratings) : undefined,
        discountPercent: !isNaN(discount) ? discount : undefined,
        finalPrice: !isNaN(finalPrice) ? finalPrice : undefined,
        originalPrice: !isNaN(price) ? price : undefined,
      });
      // Don't update category (it's immutable)
      const updated = await MensShoe.findByIdAndUpdate(id, updateData, { new: true });
      return res.json(normalizeMensShoe(updated));
    }

    // 6) Try WomensShoe collection
    existing = await WomensShoe.findById(id);
    if (existing) {
      const price = parseFloat(body.price);
      const discount = parseFloat(body.discount) || 0;
      const finalPrice = discount > 0 ? price - (price * discount / 100) : price;

      const existingInfo = getExistingProductInfo(existing);
      const mergedInfo = {
        ...existingInfo,
        brand: body.product_info?.brand || existingInfo.brand,
        gender: 'Women',
      };
      if (body.product_info?.warranty) mergedInfo.warranty = body.product_info.warranty;

      const updateData = clean({
        title: body.title,
        price: !isNaN(price) ? price : undefined,
        description: body.description,
        subCategory: body.subCategory || undefined,
        subSubCategory: body.subSubCategory || undefined,
        product_info: mergedInfo,
        images: imagesArray.length > 0 ? imagesArray : undefined,
        rating: body.ratings != null ? parseFloat(body.ratings) : undefined,
        discountPercent: !isNaN(discount) ? discount : undefined,
        finalPrice: !isNaN(finalPrice) ? finalPrice : undefined,
        originalPrice: !isNaN(price) ? price : undefined,
      });
      // Don't update category (it's immutable)
      const updated = await WomensShoe.findByIdAndUpdate(id, updateData, { new: true });
      return res.json(normalizeWomensShoe(updated));
    }

    return res.status(404).json({ message: "Product not found in any collection" });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Duplicate key error", error: error?.message });
    }
    console.error("Update product error:", error);
    res.status(400).json({ message: "Error updating product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Try deleting from each collection until found
    let deleted = await Product.findByIdAndDelete(id);
    if (deleted) return res.json({ message: "Product deleted successfully" });

    deleted = await ContactLens.findByIdAndDelete(id);
    if (deleted) return res.json({ message: "Product deleted successfully" });

    deleted = await Accessory.findByIdAndDelete(id);
    if (deleted) return res.json({ message: "Product deleted successfully" });

    deleted = await Bag.findByIdAndDelete(id);
    if (deleted) return res.json({ message: "Product deleted successfully" });

    deleted = await MensShoe.findByIdAndDelete(id);
    if (deleted) return res.json({ message: "Product deleted successfully" });

    deleted = await WomensShoe.findByIdAndDelete(id);
    if (deleted) return res.json({ message: "Product deleted successfully" });

    return res.status(404).json({ message: "Product not found in any collection" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

export const listOrders = async (req, res) => {
  try {
    console.log('🔍 listOrders called');
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    console.log('🔍 Filter:', filter);
    console.log('🔍 Order model exists:', !!Order);
    
    // First try without populate to see if basic query works
    console.log('🔍 Trying basic Order.find...');
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    console.log('📊 Orders found (no populate):', orders.length);
    
    // If we have orders, try to populate them
    if (orders.length > 0) {
      try {
        console.log('🔍 Trying to populate...');
        const populatedOrders = await Order.find(filter)
          .populate("userId", "name email")
          .populate("items.productId")
          .sort({ createdAt: -1 });
        console.log('📊 Populated orders:', populatedOrders.length);
        res.json(populatedOrders);
      } catch (populateError) {
        console.error('❌ Populate error:', populateError);
        // Return orders without populate if populate fails
        res.json(orders);
      }
    } else {
      res.json(orders);
    }
  } catch (error) {
    console.error('❌ Error in listOrders:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "processing", "delivered", "cancel"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("userId", "name email")
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error: error.message });
  }
};

