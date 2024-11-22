import { useFirebase } from '@/context/FirebaseContext';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const page = () => {
    const [userData, setUserData] = useState({
        correo: '',
        contrasena: ''
    });

    const navigate = useNavigate()
    // Función para manejar el cambio en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };
    const { login, getUserData } = useFirebase();
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar que la página se recargue
        try {
            // Llamar a la función login desde tu contexto
            const user = await login(userData.correo, userData.contrasena);
            console.log('Usuario autenticado:', user);
            
            // Obtener los datos del usuario desde Firestore usando el uid del usuario autenticado
            const userDataFromFirestore = await getUserData(user.uid);
            
            if (userDataFromFirestore && userDataFromFirestore.role === 'Usuario') {
                navigate('/analisis');
            } else if (userDataFromFirestore && userDataFromFirestore.role === 'Admin') {
                navigate('/admin');
            } else {
                console.error('Rol de usuario no reconocido.');
            }
            
        } catch (error) {
            console.error('Error en el inicio de sesión:', error.message);
            // Muestra un mensaje de error en el frontend si es necesario
        }
    };
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />

                   
                </section>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className='p-4 shadow-lg'>

                            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                                <h2 className='font-bold text-2xl text-green-dark'>Login</h2>

                                <div className="col-span-6">
                                    <label htmlFor="Correo" className="block text-sm font-medium text-gray-700"> Email </label>

                                    <input
                                        type="email"
                                        id="Correo"
                                        name="correo"
                                        value={userData.correo}
                                        onChange={handleInputChange}
                                        className="mt-1 w-full rounded-md h-8 border-gray-200 bg-white text-sm text-gray-700 shadow-md"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Contrasena" className="block text-sm font-medium text-gray-700"> Password </label>

                                    <input
                                        type="password"
                                        id="Contrasena"
                                        name="contrasena"
                                        value={userData.contrasena}
                                        onChange={handleInputChange}
                                        className="mt-1 w-full rounded-md h-8 border-gray-200 bg-white text-sm text-gray-700 shadow-md"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <p className="text-sm text-gray-500">
                                        By creating an account, you agree to our
                                        <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                                        and
                                        <a href="#" className="text-gray-700 underline">privacy policy</a>.
                                    </p>
                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        type="submit"
                                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-green-medium px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-medium focus:outline-none focus:ring active:text-green-medium"
                                    >
                                        Sing in
                                    </button>
                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Ya tienes una cuenta?
                                        <a href="/singup" className="text-green-medium underline">Crear cuenta</a>.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default page
