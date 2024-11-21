import React from 'react'

const TeamMembers = () => {
    const team = [
        {
            name: "Paco",
            role: "CEO & Fundadora",
            bio: "Con más de 10 años de experiencia en UX y análisis de datos.",
            image: "https://via.placeholder.com/500"
        },
        {
            name: "Elvin",
            role: "CTO",
            bio: "Experto en desarrollo de software y arquitectura de sistemas.",
            image: "https://via.placeholder.com/500"
        },
        {
            name: "Chayan",
            role: "Diseñadora UX",
            bio: "Apasionada por crear experiencias de usuario intuitivas y atractivas.",
            image: "https://via.placeholder.com/500"
        }
    ]

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">Nuestro Equipo</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {team.map((member, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 text-center"
                        >
                            <img 
                                src={member.image} 
                                alt={member.name} 
                                className="w-40 h-40 object-cover rounded-full mx-auto mb-6"
                            />
                            <h3 className="text-2xl font-semibold mb-2 text-gray-900">{member.name}</h3>
                            <p className="text-green-medium font-medium mb-4">{member.role}</p>
                            <p className="text-gray-600">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TeamMembers
