import { useFirebase } from '@/context/FirebaseContext';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const page = () => {
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        contraseña: '',
        confirmarContraseña: ''
    });
    const [error, setError] = useState('');
    const { register } = useFirebase();

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Resetear el error al enviar el formulario

        // Validar contraseñas
        if (userData.contraseña !== userData.confirmarContraseña) {
            setError('Las contraseñas no coinciden');
            return;
        }

        // Validar campos vacíos
        if (Object.values(userData).some((val) => val.trim() === '')) {
            setError('Por favor, rellena todos los campos');
            return;
        }

        try {
            console.log('esta apunto de la funcion')
            // Intentar registrar al usuario
            await register(userData.correo, userData.contraseña, userData.nombre, userData.apellido);
            navigate("/analisis")
            console.log('Usuario registrado exitosamente:', userData);
            setError(''); // Limpiar errores si el registro es exitoso
        } catch (err) {
            setError('Error al registrar el usuario. Inténtalo de nuevo');
            console.error(err); // Manejar el error adecuadamente
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
                                <h2 className='font-bold text-2xl text-green-dark text-center'>Crear Cuenta</h2>
                                <form onSubmit={handleSubmit} action="#" className="mt-8 grid grid-cols-6 gap-6">

                                    <div className="col-span-6 sm:col-span-3">
                                           <label htmlFor="Nombre" className="block text-sm font-medium text-gray-700">
                                                First Name
                                            </label>

                                            <input
                                                type="text"
                                                id="Nombre"
                                                name="nombre"
                                                value={userData.nombre}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full rounded-md h-8 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                               />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="Apellido" className="block text-sm font-medium text-gray-700">
                                                Last Name
                                            </label>

                                            <input
                                                type="text"
                                                id="Apellido"
                                                name="apellido"
                                                value={userData.apellido}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full rounded-md h-8 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                 />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="Correo" className="block text-sm font-medium text-gray-700"> Email </label>

                                        <input
                                            type="email"
                                            id="Correo"
                                            name="correo"
                                            value={userData.correo}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md h-8 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                           />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700"> Password </label>

                                        <input
                                            type="password"
                                            id="Contraseña"
                                            name="contraseña"
                                            value={userData.contraseña}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full rounded-md h-8 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">

                                            <label htmlFor="ConfirmarContraseña" className="block text-sm font-medium text-gray-700">
                                                Password Confirmation
                                            </label>

                                            <input
                                                type="password"
                                                id="ConfirmarContraseña"
                                                name="confirmarContraseña"
                                                value={userData.confirmarContraseña}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full rounded-md h-8 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                                />
                                    </div>
                                    {/* Mensaje de error */}
                                    {error && <p className="text-red-500 mt-2 flex w-full">{error}</p>}
                                

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
                                            className="inline-block shrink-0 rounded-md border border-gray-600 bg-green-medium px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-medium focus:outline-none focus:ring active:text-green-medium"
                                        >
                                            Crear tu cuenta
                                        </button>

                                        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                            Ya tienes una cuenta?
                                            <a href="/login" className="text-green-medium underline">Log in</a>.
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
