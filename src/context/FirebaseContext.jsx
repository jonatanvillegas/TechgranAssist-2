// FirebaseContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, storage } from '../../firebaseConfig'; // Importa tus servicios de Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Crear el contexto
const FirebaseContext = createContext();

// Hook personalizado para acceder al contexto
export const useFirebase = () => useContext(FirebaseContext);

// Proveedor del contexto de Firebase
export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Observa los cambios de estado de autenticación
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Limpia el observador cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  // Función de registro de usuario
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  };

  // Función de inicio de sesión
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  // Función de cierre de sesión
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

  // Función para obtener datos del Firestore
  const getUserData = async (uid) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  };

  // Función para subir una imagen a Cloud Storage
  const uploadImage = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    getUserData,
    uploadImage,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
};
