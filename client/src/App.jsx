import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Ζητάμε τα προϊόντα από το Backend (Port 5000)
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error fetching data:", err)
        setError("Δεν ήταν δυνατή η σύνδεση με τον Server.")
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>E-Shop Sports 🏀</h1>
      
      {loading && <p>Φόρτωση προϊόντων...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>Δεν υπάρχουν προϊόντα ακόμα στη βάση.</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
            <h3>{product.title}</h3>
            <p>Τιμή: <strong>{product.price}€</strong></p>
            <p>Απόθεμα: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App