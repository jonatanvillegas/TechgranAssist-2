// FirebaseContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, storage } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth, deleteUser, onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Crear el contexto
const FirebaseContext = createContext();

// Hook personalizado para acceder al contexto
export const useFirebase = () => useContext(FirebaseContext);

// Proveedor del contexto de Firebase
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado global para el usuario
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Observa los cambios de estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Si hay un usuario autenticado, obtiene los datos de Firestore
        const userData = await getUserData(user.uid);
        setCurrentUser({ ...user, ...userData }); // Combina los datos del usuario y los de Firestore
      } else {
        setCurrentUser(null); // No hay usuario autenticado
      }
      setLoading(false); // Cambia el estado de carga después de verificar
    });

    // Limpia el observador cuando el componente se desmonta
    return () => unsubscribe();
  }, [auth]);

  // Función de registro de usuario
  const register = async (email, password, nombre, apellido) => {
    try {
      // Crear usuario en la autenticación de Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, "users", user.uid), {
        nombre: nombre,
        apellido: apellido,
        correo: email,
        role: 'Usuario',
        uid: user.uid, 
        createdAt: new Date(), 
      });

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
      const userData = await getUserData(userCredential.user.uid);

      // Actualizar el estado global del usuario
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        ...userData, // Combina los datos del usuario de Firestore
      });

      return userCredential.user; // Devuelve el usuario si es necesario
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
      console.log('No existe el documento para este usuario.');
      return null;
    }
  };
  const getAllUsersInRealTime = (setUsers) => { 
    try {
      const usersCollectionRef = collection(db, 'users');
  
      // Escuchar los cambios en tiempo real en la colección "users"
      const unsubscribe = onSnapshot(usersCollectionRef, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
  
        // Actualiza el estado o cualquier otra lógica con la lista de usuarios
        setUsers(users);
      });
  
      // Retorna la función de desuscripción para limpiarla cuando sea necesario
      return () => unsubscribe();
    } catch (error) {
      console.error('Error al obtener usuarios en tiempo real:', error);
      throw error;
    }
  };
  const getHistorial = (setHistory) => { 
    try {
      const usersCollectionRef = collection(db, 'analisis');
  
      // Escuchar los cambios en tiempo real en la colección "users"
      const unsubscribe = onSnapshot(usersCollectionRef, (querySnapshot) => {
        const analisis = [];
        querySnapshot.forEach((doc) => {
          analisis.push({ id: doc.id, ...doc.data() });
        });
  
        // Actualiza el estado o cualquier otra lógica con la lista de usuarios
        setHistory(analisis);
      });
  
      // Retorna la función de desuscripción para limpiarla cuando sea necesario
      return () => unsubscribe();
    } catch (error) {
      console.error('Error al obtener usuarios en tiempo real:', error);
      throw error;
    }
  };
  const deleteUserById = async (userId) => {
    try {
      // Eliminar el documento del usuario en Firestore
      const userDocRef = doc(db, 'users', userId);
      await deleteDoc(userDocRef);

      console.log('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw error; // Lanzar el error para manejarlo más arriba si es necesario
    }
  };
  const deleteAnalisisById = async (Id) => {
    try {
      // Eliminar el documento del usuario en Firestore
      const userDocRef = doc(db, 'analisis', Id);
      await deleteDoc(userDocRef);

      console.log('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw error; // Lanzar el error para manejarlo más arriba si es necesario
    }
  };
  // Función para subir una imagen a Cloud Storage
  const uploadImage = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };


const updateUser = async (uid, updatedData) => {
  try {
    const userDocRef = doc(db, 'users', uid); // Referencia al documento del usuario en Firestore
    await updateDoc(userDocRef, updatedData); // Actualiza los campos específicos con los nuevos valores
    console.log('Usuario actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};


  const value = {
    currentUser,
    register,
    login,
    logout,
    getUserData,
    uploadImage,
    getAllUsersInRealTime,
    deleteUserById,
    user,
    updateUser,
    getHistorial,
    deleteAnalisisById
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
};
