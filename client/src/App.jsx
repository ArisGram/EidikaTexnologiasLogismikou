import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    stock: ''
  })

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error:", err)
        setError("Δεν ήταν δυνατή η σύνδεση.")
        setLoading(false)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/products', formData)
      .then(response => {
        setProducts([...products, response.data]);
        setFormData({ title: '', price: '', stock: '' });
      })
      .catch(err => alert('Σφάλμα κατά την προσθήκη: ' + err.message));
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>E-Shop Sports 🏀</h1>

      { }
      <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>Προσθήκη Νέου Προϊόντος</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Όνομα Προϊόντος" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required 
          />
          <input 
            type="number" 
            placeholder="Τιμή" 
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required 
          />
          <input 
            type="number" 
            placeholder="Απόθεμα" 
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            required 
          />
          <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>Προσθήκη</button>
        </form>
      </div>

      { }
      {loading && <p>Φόρτωση...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{product.title}</h3>
            <p>Τιμή: <strong style={{ color: '#2ecc71' }}>{product.price}€</strong></p>
            <p>Στοκ: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App