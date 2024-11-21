
import { expect, test } from 'vitest';


const registerUser = (email, password) => {
 
  if (!email || !password) {
    throw new Error('Email y contraseña son requeridos');
  }
  

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    throw new Error('Email inválido');
  }


  if (password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }


  return {
    email: email,
    message: 'Usuario registrado exitosamente',
  };
};

test('debería registrar un usuario correctamente con email y contraseña válidos', () => {
  const email = 'usuario@ejemplo.com';
  const password = 'secreto123';

  const result = registerUser(email, password);

  expect(result.message).toBe('Usuario registrado exitosamente');
  expect(result.email).toBe(email);
});

test('debería lanzar un error si no se proporciona un email', () => {
  const email = '';
  const password = 'secreto123';

  expect(() => registerUser(email, password)).toThrow('Email y contraseña son requeridos');
});

test('debería lanzar un error si no se proporciona una contraseña', () => {
  const email = 'usuario@ejemplo.com';
  const password = '';

  expect(() => registerUser(email, password)).toThrow('Email y contraseña son requeridos');
});

test('debería lanzar un error si el email no es válido', () => {
  const email = 'usuario@ejemplo';
  const password = 'secreto123';

  expect(() => registerUser(email, password)).toThrow('Email inválido');
});

test('debería lanzar un error si la contraseña es demasiado corta', () => {
  const email = 'usuario@ejemplo.com';
  const password = '123';

  expect(() => registerUser(email, password)).toThrow('La contraseña debe tener al menos 6 caracteres');
});
