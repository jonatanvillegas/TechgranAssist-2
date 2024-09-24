
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3>
                                <ul className="mt-4 space-y-4">
                                    {['Marketing', 'Analytics'].map((item) => (
                                        <li key={item}>
                                            <a href="#" className="text-base text-gray-300 hover:text-white">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                                <ul className="mt-4 space-y-4">
                                    {['Documentation', 'Guides'].map((item) => (
                                        <li key={item}>
                                            <a href="#" className="text-base text-gray-300 hover:text-white">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                                <ul className="mt-4 space-y-4">
                                    {['About', 'Press'].map((item) => (
                                        <li key={item}>
                                            <a href="#" className="text-base text-gray-300 hover:text-white">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                                <ul className="mt-4 space-y-4">
                                    {['Privacy', 'Policy'].map((item) => (
                                        <li key={item}>
                                            <a href="#" className="text-base text-gray-300 hover:text-white">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                        {[
                            { name: 'Facebook', icon: Facebook },
                            { name: 'Twitter', icon: Twitter },
                            { name: 'Instagram', icon: Instagram },
                            { name: 'LinkedIn', icon: Linkedin },
                        ].map((item) => (
                            <a key={item.name} href="#" className="text-gray-400 hover:text-gray-300">
                                <span className="sr-only">{item.name}</span>
                                <item.icon className="h-6 w-6" aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                    <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                        &copy; {new Date().getFullYear()} TeachgranAssist. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}