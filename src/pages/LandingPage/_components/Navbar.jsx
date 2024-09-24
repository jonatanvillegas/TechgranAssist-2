import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-50 text-green-dark shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                {/* Logo/Nombre de la App */}
                <div className="text-2xl font-bold">
                    <a href="#home" className="hover:text-green-medium">
                        TeachgranAssist
                    </a>
                </div>

                {/* Navegación */}
                <div className="space-x-4">
                    <a href="#about-us" className="hover:text-green-medium">
                        About Us
                    </a>
                    <a href="#how-it-works" className="hover:text-green-medium">
                        How It Works
                    </a>
                    <a href="#team" className="hover:text-green-medium">
                        Our Team
                    </a>
                    <a href="#contact" className="hover:text-green-medium">
                        Contact
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
