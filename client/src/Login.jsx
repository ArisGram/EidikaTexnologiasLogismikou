import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', formData);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      
      alert('Επιτυχής σύνδεση!');
      window.location.href = '/'; 
    } catch (err) {
      alert('Σφάλμα: Λάθος email ή κωδικός');
    }
  };

  return (
    <div className="container" style={{justifyContent: 'center'}}>
      <div className="admin-panel" style={{maxWidth: '400px', width: '100%', padding: '40px'}}>
        <h2 style={{textAlign: 'center', marginBottom: '30px', color: 'var(--primary)'}}>👋 Καλώς ήρθατε</h2>
        
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
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
            Είσοδος
          </button>
        </form>
        
        <p style={{textAlign: 'center', marginTop: '20px', color: '#666'}}>
          Δεν έχετε λογαριασμό; <a href="/register" style={{color: 'var(--accent)', fontWeight: 'bold'}}>Εγγραφή</a>
        </p>
      </div>
    </div>
  );
}

export default Login;