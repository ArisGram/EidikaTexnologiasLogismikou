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
      
      // Αποθήκευση του Token στο LocalStorage του browser
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role); // Κρατάμε και τον ρόλο (admin/customer)
      
      alert('Επιτυχής σύνδεση!');
      window.location.href = '/'; // Επιστροφή στην αρχική σελίδα
    } catch (err) {
      alert('Σφάλμα: Λάθος email ή κωδικός');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Σύνδεση</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="email" placeholder="Email" required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" placeholder="Κωδικός" required
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button type="submit" style={{ background: '#27ae60', color: 'white', padding: '10px' }}>
          Είσοδος
        </button>
      </form>
    </div>
  );
}

export default Login;