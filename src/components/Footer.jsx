import React from 'react';
import { Facebook, Linkedin, Instagram, MapPin, Phone, Mail, Clock, ChevronRight, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6 lg:px-20 font-display">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Company Info */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                                <Factory className="text-slate-900" size={24} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white italic">
                                VOLPER <span className="text-primary">SEAL</span>
                            </span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-lg font-bold text-white">Nosotros</h2>
                            <p className="text-sm leading-relaxed">
                                Expertos en conexiones de bronce y soluciones de sellado industrial. Brindamos calidad y precisión en cada componente.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            {[Linkedin, Facebook, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-slate-900 transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-lg font-bold text-white">Enlaces Rápidos</h2>
                        <ul className="flex flex-col gap-4">
                            {[
                                { name: 'Inicio', link: '/' },
                                { name: 'Catálogo de Productos', link: '/catalogo' },
                                { name: 'Nosotros', link: '/nosotros' },
                                { name: 'Contacto', link: '/contacto' },
                                { name: 'Soluciones / FAQ', link: '/soluciones' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.link} className="text-sm hover:text-primary transition-colors flex items-center gap-2">
                                        <ChevronRight size={14} className="text-primary" /> {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-lg font-bold text-white">Categorías</h2>
                        <ul className="flex flex-col gap-4">
                            {[
                                { name: 'Conexiones de Bronce', link: '#' },
                                { name: 'Empaquetaduras Industriales', link: '#' },
                                { name: 'Bombas de Inyección', link: '#' },
                                { name: 'Servicios Técnicos', link: '#' }
                            ].map((cat) => (
                                <li key={cat.name}>
                                    <Link to={cat.link} className="text-sm hover:text-primary transition-colors flex items-center gap-2">
                                        <ChevronRight size={14} className="text-primary" /> {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-lg font-bold text-white">Contacto</h2>
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-3">
                                <MapPin className="text-primary flex-shrink-0" size={20} />
                                <div className="flex flex-col gap-1">
                                    <p className="text-white text-sm font-medium">Dirección</p>
                                    <p className="text-xs">Calle Industrial #123, Santiago, Chile</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Phone className="text-primary flex-shrink-0" size={20} />
                                <div className="flex flex-col gap-1">
                                    <p className="text-white text-sm font-medium">Teléfono Central</p>
                                    <p className="text-xs">+56 2 2XXX XXXX</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Mail className="text-primary flex-shrink-0" size={20} />
                                <div className="flex flex-col gap-1">
                                    <p className="text-white text-sm font-medium">Correo</p>
                                    <p className="text-xs">ventas@volperseal.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs">
                        © 2026 Volper Seal - Todos los derechos reservados
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-slate-500 hover:text-primary text-xs transition-colors">Privacidad</a>
                        <a href="#" className="text-slate-500 hover:text-primary text-xs transition-colors">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
