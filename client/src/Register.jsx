import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/register', formData);
      alert('Η εγγραφή πέτυχε! Τώρα μπορείς να συνδεθείς.');
      navigate('/login');
    } catch (err) {
      alert('Σφάλμα: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container" style={{justifyContent: 'center'}}>
      <div className="admin-panel" style={{maxWidth: '400px', width: '100%', padding: '40px'}}>
        <h2 style={{textAlign: 'center', marginBottom: '30px', color: 'var(--primary)'}}>🚀 Δημιουργία Λογαριασμού</h2>
        
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div className="form-group">
            <label>Ονοματεπώνυμο</label>
            <input 
              type="text" 
              placeholder="π.χ. Γιάννης Παπαδόπουλος" 
              required
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              style={{width: '100%', padding: '12px', boxSizing: 'border-box'}}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{width: '100%', padding: '12px', boxSizing: 'border-box'}}
            />
          </div>
          
          <div className="form-group">
            <label>Κωδικός Πρόσβασης</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={{width: '100%', padding: '12px', boxSizing: 'border-box'}}
            />
          </div>

          <button type="submit" className="btn-add" style={{width: '100%', fontSize: '1.1rem', marginTop: '10px'}}>
            Εγγραφή
          </button>
        </form>

        <p style={{textAlign: 'center', marginTop: '20px', color: '#666'}}>
          Έχετε ήδη λογαριασμό; <a href="/login" style={{color: 'var(--accent)', fontWeight: 'bold'}}>Σύνδεση</a>
        </p>
      </div>
    </div>
  );
}

export default Register;