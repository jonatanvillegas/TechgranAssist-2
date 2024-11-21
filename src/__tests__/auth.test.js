import { test, expect } from 'vitest';

const authenticate = (username, password) => {
  if (username === 'testUser' && password === 'testPassword') {
    return { token: 'fake-jwt-token' };
  } else {
    throw new Error('Credenciales incorrectas'); 
  }
};

test('autenticación exitosa con credenciales correctas', async () => {
  const username = 'testUser';
  const password = 'testPassword';
  

  const response = authenticate(username, password);
  

  expect(response.token).toBe('fake-jwt-token');
});

test('autenticación fallida con credenciales incorrectas', async () => {
  const username = 'wrongUser';
  const password = 'wrongPassword';
  
  try {
    authenticate(username, password);
  } catch (error) {
    expect(error.message).toBe('Credenciales incorrectas');
  }
});
