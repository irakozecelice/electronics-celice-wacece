import React, { useState, useEffect } from 'react';
import './app.css';

const ProductPage = () => {
  // Sample product data
  const allProducts = [
    { id: 1, name: 'Smartphone X', category: 'Phones', price: 499.99, rating: 4.5, image: '3.jpg', description: 'Latest smartphone with advanced camera features', stock: 15 },
    { id: 2, name: 'Laptop Pro', category: 'Laptops', price: 999.99, rating: 4.8, image: '4.jpg', description: 'High-performance laptop for professionals', stock: 8 },
    { id: 3, name: 'Wireless Earbuds', category: 'Accessories', price: 79.99, rating: 4.2, image: '5.jpg', description: 'Noise-cancelling wireless earbuds', stock: 25 },
    { id: 4, name: 'Smart Watch', category: 'Wearables', price: 199.99, rating: 4.3, image: '6.jpg', description: 'Fitness tracking and notifications', stock: 12 },
    { id: 5, name: 'Tablet Lite', category: 'Tablets', price: 299.99, rating: 4.0, image: 'tablet.jpg', description: 'Compact tablet for everyday use', stock: 7 },
    { id: 6, name: 'Gaming Console', category: 'Gaming', price: 399.99, rating: 4.7, image: 'console.jpg', description: 'Next-gen gaming experience', stock: 5 },
    { id: 7, name: '4K Smart TV', category: 'TVs', price: 799.99, rating: 4.6, image: 'tv.jpg', description: '55-inch 4K Ultra HD Smart TV', stock: 10 },
    { id: 8, name: 'Bluetooth Speaker', category: 'Audio', price: 129.99, rating: 4.4, image: 'speaker.jpg', description: 'Portable waterproof speaker', stock: 18 },
  ];

  // State management
  const [products, setProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Get unique categories for filter
  const categories = ['All', ...new Set(allProducts.map(product => product.category))];

  // Filter products
  useEffect(() => {
    setIsLoading(true);
    
    let filtered = allProducts;
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setProducts(filtered);
    setTimeout(() => setIsLoading(false), 300);
  }, [searchTerm, selectedCategory, priceRange]);

  // Cart functions
  const addToCart = (product) => {
    setCart([...cart, {...product, quantity: 1}]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === productId ? {...item, quantity: newQuantity} : item
    ));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Authentication functions
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    alert('Registration successful! Please login.');
    setShowRegisterForm(false);
    setFormData({ name: '', email: '', password: '', phone: '' });
    setShowLoginForm(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', loginData);
    setIsLoggedIn(true);
    setShowLoginForm(false);
    setLoginData({ email: '', password: '' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="product-page">
      {/* Top Navigation Bar */}
      <nav className="top-navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="2.jpg" alt="CELICE WACECE Logo" />
            <span>CELICE WACECE electronics</span>
          </div>
          
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Categories</a>
            <a href="#">Deals</a>
            <a href="#">Contact</a>
          </div>
          
          <div className="nav-actions">
            {isLoggedIn ? (
              <>
                <button className="account-btn">
                  <i className="fas fa-user"></i> My Account
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  className="login-btn"
                  onClick={() => setShowLoginForm(!showLoginForm)}
                >
                  <i className="fas fa-sign-in-alt"></i> Login
                </button>
                <button 
                  className="register-btn"
                  onClick={() => setShowRegisterForm(!showRegisterForm)}
                >
                  <i className="fas fa-user-plus"></i> Register
                </button>
              </>
            )}
            <button className="cart-btn">
              <i className="fas fa-shopping-cart"></i> Cart ({cart.length})
            </button>
          </div>
        </div>
        
        {/* Registration Form */}
        {showRegisterForm && (
          <div className="form-overlay">
            <form className="auth-form" onSubmit={handleRegisterSubmit}>
              <button 
                type="button" 
                className="close-btn"
                onClick={() => setShowRegisterForm(false)}
              >
                &times;
              </button>
              <h3>Create an Account</h3>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <button type="submit" className="submit-btn">Register</button>
            </form>
          </div>
        )}
        
        {/* Login Form */}
        {showLoginForm && (
          <div className="form-overlay">
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <button 
                type="button" 
                className="close-btn"
                onClick={() => setShowLoginForm(false)}
              >
                &times;
              </button>
              <h3>Login to Your Account</h3>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="enter your password here"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="enter your password here"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Login</button>
              <p className="form-footer">
                Don't have an account? 
                <button 
                  type="button"
                  onClick={() => {
                    setShowLoginForm(false);
                    setShowRegisterForm(true);
                  }}
                >
                  Register here
                </button>
              </p>
            </form>
          </div>
        )}
      </nav>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Summer Sale - Up to 50% Off</h1>
          <p>Limited time offer on selected products</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </section>

      {/* Categories Section */}
<section className="categories-section">
  <h2>Shop by Category</h2>
  <div className="categories-grid">
    <div className="category-card">
      <img src="9.jpg" alt="Electronics" />
      <h3>phones</h3>
    </div>
    <div className="category-card">
      <img src="4.jpg" alt="Clothing" />
      <h3>laptop</h3>
    </div>
    <div className="category-card">
      <img src="b.jpg" alt="Home & Kitchen" />
      <h3>tvs</h3>
    </div>
    <div className="category-card">
      <img src="8.jpg" alt="Books" />
      <h3>camera</h3>
    </div>
  </div>
</section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {allProducts.slice(0, 4).map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button 
                  className="quick-view-btn"
                  onClick={() => setSelectedProduct(product)}
                >
                  Quick View
                </button>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="price">${product.price.toFixed(2)}</div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Product Listing (your existing code) */}
      <section className="main-products">
        <h1>ALL PRODUCTS</h1>
        {/* Your existing search and filter components */}
        {/* Your existing product listing */}
      </section>

      {/* Shopping Cart Sidebar */}
      <div className={`cart-sidebar ${cart.length > 0 ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart ({cart.length})</h3>
          <button className="close-cart">&times;</button>
        </div>
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h4>{item.name}</h4>
                <div className="item-price">${item.price.toFixed(2)}</div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <button 
                className="remove-item"
                onClick={() => removeFromCart(item.id)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="product-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setSelectedProduct(null)}>
              &times;
            </button>
            <div className="modal-body">
              <div className="product-images">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="product-details">
                <h2>{selectedProduct.name}</h2>
                <div className="product-meta">
                  <div className="price">${selectedProduct.price.toFixed(2)}</div>
                  <div className="rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i 
                        key={i} 
                        className={`fas fa-star ${i < Math.floor(selectedProduct.rating) ? 'filled' : ''}`}
                      ></i>
                    ))}
                    <span>({selectedProduct.rating})</span>
                  </div>
                  <div className={`stock ${selectedProduct.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {selectedProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
                <p className="description">{selectedProduct.description}</p>
                <div className="product-actions">
                  <div className="quantity-selector">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                  </div>
                  <button 
                    className="add-to-cart"
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button className="wishlist">
                    <i className="far fa-heart"></i> Wishlist
                  </button>
                </div>
                <div className="product-specs">
                  <h4>Specifications</h4>
                  <table>
                    <tbody>
                      <tr>
                        <td>Category</td>
                        <td>{selectedProduct.category}</td>
                      </tr>
                      <tr>
                        <td>Brand</td>
                        <td>CELICE WACECE</td>
                      </tr>
                      <tr>
                        <td>Warranty</td>
                        <td>2 Years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <h3>Subscribe to Our Newswebsite</h3>
          <p>Get the latest updates on new products and upcoming sales</p>
          <p>WE LOVE YOU ALL OUR CLIENTS</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li><a href="#">All Products</a></li>
              <li><a href="#">Featured</a></li>
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Sale Items</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>About Us</h4>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-pinterest-p"></i></a>
            </div>
            <div className="payment-methods">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-paypal"></i>
              <i className="fab fa-cc-apple-pay"></i>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CELICE WACECE Electronics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;