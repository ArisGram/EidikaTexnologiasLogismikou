import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div className="container"><h2>Φόρτωση...</h2></div>;

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <div style={{ 
        display: 'flex', 
        gap: '40px', 
        background: 'white', 
        padding: '40px', 
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        width: '100%'
      }}>
        
        <div style={{ flex: 1 }}>
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            style={{ width: '100%', borderRadius: '12px', border: '1px solid #eee' }} 
          />
        </div>

        <div style={{ flex: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#666' }}>← Πίσω στο Κατάστημα</Link>
          
          <h1 style={{ fontSize: '2.5rem', margin: '10px 0', color: '#2c3e50' }}>{product.title}</h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>Κωδικός Προϊόντος: {product.id}</p>
          
          <div style={{ margin: '20px 0', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h2 style={{ color: '#e74c3c', fontSize: '2.5rem', margin: 0 }}>{product.price}€</h2>
            <p style={{ 
              color: product.stock > 0 ? '#27ae60' : '#e74c3c', 
              fontWeight: 'bold', 
              marginTop: '5px' 
            }}>
              {product.stock > 0 ? `✔ Άμεσα Διαθέσιμο (${product.stock} τμχ)` : '✖ Εξαντλήθηκε'}
            </p>
          </div>

          <h3>Περιγραφή</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {product.description || "Δεν υπάρχει διαθέσιμη περιγραφή για αυτό το προϊόν. Επικοινωνήστε μαζί μας για περισσότερες λεπτομέρειες."}
          </p>

          <div style={{ marginTop: '30px' }}>
            <button 
              className="btn-add" 
              style={{ padding: '15px 30px', fontSize: '1.1rem', width: '100%' }}
              onClick={() => alert("Πρόσθεσε το από την Αρχική Σελίδα (Προς το παρόν!)")}
            >
              Προσθήκη στο Καλάθι 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;