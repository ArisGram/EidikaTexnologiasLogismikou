import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Στέλνουμε τα στοιχεία στο Backend
      await axios.post('http://localhost:5000/auth/register', formData);
      alert('Η εγγραφή πέτυχε! Τώρα μπορείς να συνδεθείς.');
      // Εδώ κανονικά θα κάναμε redirect στο Login, θα το φτιάξουμε σε λίγο
    } catch (err) {
      alert('Σφάλμα: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Εγγραφή Χρήστη</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="text" placeholder="Ονοματεπώνυμο" required
          value={formData.fullName}
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
        />
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
        <button type="submit" style={{ background: '#3498db', color: 'white', padding: '10px' }}>
          Εγγραφή
        </button>
      </form>
    </div>
  );
}

export default Register;