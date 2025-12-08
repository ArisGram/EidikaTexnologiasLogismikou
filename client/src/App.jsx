import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import './App.css'

function Home() {
  const [products, setProducts] = useState([])
  
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const [formData, setFormData] = useState({ title: '', price: '', stock: '' })
  const [editingId, setEditingId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', cvv: '', expiry: '' });
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const role = localStorage.getItem('role'); 

  useEffect(() => { fetchProducts(); }, [])

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }

  const handleEditClick = (product) => {
    setFormData({ title: product.title, price: product.price, stock: product.stock });
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleCancelEdit = () => {
    setFormData({ title: '', price: '', stock: '' });
    setEditingId(null);
  }

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, formData);
        alert("Το προϊόν ενημερώθηκε!");
      } else {
        await axios.post('http://localhost:5000/api/products', formData);
        alert("Το προϊόν προστέθηκε!");
      }
      fetchProducts();
      handleCancelEdit();
    } catch (err) {
      alert("Σφάλμα: " + err.message);
    }
  }

  const addToCart = (product) => {
    if (product.stock < 1) return alert("Δεν υπάρχει απόθεμα!");
    setCart([...cart, product]);
  }

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  }

  const initiateCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    if (cart.length === 0) return alert("Το καλάθι είναι άδειο!");
    setShowPayment(true);
  }

  const confirmPayment = async (e) => {
    e.preventDefault();
    const cleanNumber = cardDetails.number.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cleanNumber)) return alert("❌ Ο αριθμός κάρτας πρέπει να αποτελείται από 16 ψηφία.");
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) return alert("❌ Η ημερομηνία λήξης πρέπει να είναι MM/YY.");
    if (!/^\d{3}$/.test(cardDetails.cvv)) return alert("❌ Το CVV πρέπει να είναι τριψήφιο.");

    const token = localStorage.getItem('token');
    try {
      const orderItems = cart.map(p => ({ productId: p.id, quantity: 1 }));
      await axios.post('http://localhost:5000/api/orders', 
        { items: orderItems }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert("Η πληρωμή εγκρίθηκε! 🎉");
      setCart([]);
      setShowPayment(false);
      setCardDetails({ number: '', cvv: '', expiry: '' });
      fetchProducts();
    } catch (err) {
      alert("Σφάλμα κατά την αγορά");
    }
  }

  // --- ΦΙΛΤΡΑΡΙΣΜΑ ΠΡΟΪΟΝΤΩΝ ---
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* Payment Modal */}
      {showPayment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>💳 Πληρωμή</h2>
            <p>Σύνολο: <b>{cart.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2)}€</b></p>
            <form onSubmit={confirmPayment} className="payment-form">
              <label style={{fontSize: '0.9rem', fontWeight: 'bold'}}>Αριθμός Κάρτας</label>
              <input placeholder="0000 0000 0000 0000" required maxLength="16" value={cardDetails.number} onChange={e => setCardDetails({...cardDetails, number: e.target.value})} />
              <div style={{display: 'flex', gap: '15px'}}>
                <div style={{flex: 1}}>
                  <label style={{fontSize: '0.9rem', fontWeight: 'bold'}}>Λήξη (MM/YY)</label>
                  <input placeholder="MM/YY" required maxLength="5" value={cardDetails.expiry} onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})} />
                </div>
                <div style={{flex: 1}}>
                  <label style={{fontSize: '0.9rem', fontWeight: 'bold'}}>CVV</label>
                  <input placeholder="123" required maxLength="3" type="password" value={cardDetails.cvv} onChange={e => setCardDetails({...cardDetails, cvv: e.target.value})} />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowPayment(false)} className="btn-cancel">Ακύρωση</button>
                <button type="submit" className="btn-pay">Πληρωμή</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="main-content">
        <div className="hero-section">
          <h1>Welcome to E-Shop Sports 🏀</h1>
          <p>Βρες τον κορυφαίο εξοπλισμό για την προπόνησή σου.</p>
        </div>

        {/* --- SEARCH BAR UI --- */}
        <div style={{marginBottom: '20px', display: 'flex', gap: '10px'}}>
          <input 
            type="text" 
            placeholder="🔍 Αναζήτηση προϊόντος (π.χ. Nike)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '15px', borderRadius: '8px', 
              border: '1px solid #ddd', fontSize: '1rem',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}
          />
        </div>
        {/* ------------------- */}

        {role === 'admin' && (
          <div className={`admin-panel ${editingId ? 'editing-mode' : ''}`}>
            <div className="admin-header">
              <h4>{editingId ? '✏️ Επεξεργασία' : '➕ Προσθήκη Προϊόντος'}</h4>
              {editingId && <button onClick={handleCancelEdit} className="btn-small-cancel">Ακύρωση</button>}
            </div>
            <form onSubmit={handleSubmitProduct} className="admin-form">
              <div className="form-group"><label>Όνομα</label><input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required /></div>
              <div className="form-group"><label>Τιμή (€)</label><input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required /></div>
              <div className="form-group"><label>Απόθεμα</label><input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required /></div>
              <button type="submit" className={editingId ? 'btn-update' : 'btn-add'}>{editingId ? 'Ενημέρωση' : 'Προσθήκη'}</button>
            </form>
          </div>
        )}

        <div className="product-grid">
          {/* ΠΡΟΣΟΧΗ: Εδώ χρησιμοποιούμε το filteredProducts */}
          {filteredProducts.length === 0 ? (
            <p style={{gridColumn: '1/-1', textAlign: 'center', color: '#888'}}>Δεν βρέθηκαν προϊόντα με αυτό το όνομα.</p>
          ) : (
            filteredProducts.map(p => (
              <div key={p.id} className="product-card">
                <div className="card-header">
                  <h3>{p.title}</h3>
                  {role === 'admin' && <button onClick={() => handleEditClick(p)} className="btn-edit">✏️</button>}
                </div>
                <div className="card-body">
                  <p className="price">{p.price}€</p>
                  <p className={`stock ${p.stock < 3 ? 'low-stock' : ''}`}>{p.stock > 0 ? `Απόθεμα: ${p.stock}` : 'Εξαντλήθηκε'}</p>
                </div>
                <button onClick={() => addToCart(p)} disabled={p.stock < 1} className={p.stock > 0 ? 'btn-cart' : 'btn-disabled'}>
                  {p.stock > 0 ? 'Προσθήκη' : 'Μη Διαθέσιμο'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="sidebar">
        <div className="cart-panel">
          <h2>🛒 Καλάθι ({cart.length})</h2>
          {cart.length === 0 ? <p className="empty-cart-msg">Το καλάθι είναι άδειο.</p> : (
            <div className="cart-items-container">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <span>{item.title}</span>
                  <div className="cart-item-actions">
                    <b>{item.price}€</b>
                    <button onClick={() => removeFromCart(index)} className="btn-remove">✕</button>
                  </div>
                </div>
              ))}
              <div className="cart-total"><span>Σύνολο:</span><strong>{cart.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2)}€</strong></div>
              <button onClick={initiateCheckout} className="btn-checkout">Ταμείο</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function App() {
  const isLoggedIn = !!localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  }

  return (
    <Router>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="brand">My E-Shop 🏀</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            {isLoggedIn ? (
              <> <Link to="/profile">Profile</Link> <button onClick={handleLogout} className="btn-logout">Logout</button> </>
            ) : (
              <> <Link to="/login">Login</Link> <Link to="/register">Register</Link> </>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} /> 
      </Routes>
    </Router>
  )
}

export default App