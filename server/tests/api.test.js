import request from 'supertest';

const API_URL = 'http://localhost:5000';

describe('E-Shop API Integration Tests', () => {

  it('GET /api/products - Θα πρέπει να επιστρέφει λίστα προϊόντων', async () => {
    const response = await request(API_URL).get('/api/products');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /auth/register - Θα πρέπει να δημιουργεί νέο χρήστη', async () => {
    const randomEmail = `testuser_${Date.now()}@example.com`;
    
    const newUser = {
      fullName: "Test User",
      email: randomEmail,
      password: "password123"
    };

    const response = await request(API_URL).post('/auth/register').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId');
  });

});