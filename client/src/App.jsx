import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'
import Register from './Register'
import './App.css'

function Home() {
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({ title: '', price: '', stock: '' })

  useEffect(() => {
    axios.get('http://localhost:5000/api/products').then(res => setProducts(res.data));
  }, [])

  const handleAdd = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/products', formData)
      .then(res => {
        setProducts([...products, res.data]);
        setFormData({ title: '', price: '', stock: '' });
      });
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>E-Shop Sports 🏀</h1>
      
      {/* Φόρμα Προσθήκης */}
      <div style={{ background: '#f9f9f9', padding: '15px', marginBottom: '20px' }}>
        <h3>Προσθήκη Προϊόντος</h3>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px' }}>
          <input placeholder="Όνομα" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <input placeholder="Τιμή" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          <button type="submit">Προσθήκη</button>
        </form>
      </div>

      {/* Λίστα */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h3>{p.title}</h3>
            <p>{p.price}€</p>
          </div>
        ))}
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
      <nav style={{ padding: '10px', background: '#333', color: 'white', marginBottom: '20px' }}>
        <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Home</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login" style={{ color: 'white', marginRight: '15px' }}>Login</Link>
            <Link to="/register" style={{ color: 'white' }}>Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={{ background: 'red', color: 'white', border: 'none' }}>Logout</button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App