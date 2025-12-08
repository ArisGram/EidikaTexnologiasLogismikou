import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Profile() {
  const [orders, setOrders] = useState([]);
  const userEmail = "User"; 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <div className="main-content">
        
        {/* Κάρτα Στοιχείων Χρήστη */}
        <div className="profile-card">
          <div className="profile-avatar">👤</div>
          <div>
            <h1 style={{margin: 0, fontSize: '1.8rem'}}>Το Προφίλ μου</h1>
            <p style={{margin: '5px 0', color: '#666'}}>Διαχείριση των παραγγελιών και των στοιχείων σου.</p>
          </div>
        </div>

        <h2 style={{color: 'var(--primary)', marginBottom: '20px'}}>📦 Ιστορικό Παραγγελιών</h2>

        {orders.length === 0 ? (
          <div style={{textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow)'}}>
            <h3>Δεν έχεις κάνει καμία παραγγελία ακόμα.</h3>
            <p>Ώρα για ψώνια!</p>
            <Link to="/" className="btn-add" style={{textDecoration: 'none', display: 'inline-block', marginTop: '10px'}}>
              Πήγαινε στο Κατάστημα
            </Link>
          </div>
        ) : (
          <div>
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <strong style={{fontSize: '1.2rem'}}>Παραγγελία #{order.id}</strong>
                    <div style={{fontSize: '0.85rem', color: '#888', marginTop: '5px'}}>
                      {new Date(order.createdAt).toLocaleDateString('el-GR')} • {new Date(order.createdAt).toLocaleTimeString('el-GR')}
                    </div>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <div style={{fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary)'}}>
                      {order.total}€
                    </div>
                    <span className="order-status">Ολοκληρώθηκε</span>
                  </div>
                </div>
                
                <ul className="order-items-list">
                  {order.OrderItems.map((item, idx) => (
                    <li key={idx} className="order-item-li">
                      <span>
                        <span style={{fontWeight: 'bold'}}>x{item.quantity}</span> Προϊόν (ID: {item.ProductId})
                      </span>
                      <span>{item.price}€ / τμχ</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar">
        <div className="cart-panel">
          <h3>Γρήγορες Επιλογές</h3>
          <ul style={{listStyle: 'none', padding: 0}}>
            <li style={{marginBottom: '10px'}}>
              <Link to="/" style={{textDecoration: 'none', color: 'var(--primary)', fontWeight: '500'}}>
                🏠 Αρχική Σελίδα
              </Link>
            </li>
         </ul>
        </div>
      </div>

    </div>
  );
}

export default Profile;