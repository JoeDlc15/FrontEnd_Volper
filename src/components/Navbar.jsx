import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Search, ShoppingCart, User, Menu, X, Moon, Sun, Phone, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { isDark, toggleDarkMode } = useTheme() || {};
    const { cartCount = 0, openDrawer } = useCart() || {};
    const location = useLocation() || { pathname: '/' };
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => location?.pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Top Bar */}
            <div className="bg-primary text-white py-2 px-6 text-sm flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <Phone size={14} /> +1 (555) 123-4567
                    </span>
                    <span className="hidden md:flex items-center gap-1">
                        <Mail size={14} /> ventas@volperseal.com
                    </span>
                </div>
            </div>

            {/* Main Nav */}
            <nav className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            alt="Volper Seal Logo"
                            className="h-10 object-contain"
                            src="https://res.cloudinary.com/dpn43zprq/image/upload/v1772195823/Logo_ho3mik.png"
                        />
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/') ? 'text-primary font-bold underline underline-offset-4' : 'text-slate-600 dark:text-slate-300'}`}>Inicio</Link>
                        <Link to="/catalogo" className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/catalogo') ? 'text-primary font-bold underline underline-offset-4' : 'text-slate-600 dark:text-slate-300'}`}>Catálogo</Link>
                        <Link to="/nosotros" className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/nosotros') ? 'text-primary font-bold underline underline-offset-4' : 'text-slate-600 dark:text-slate-300'}`}>Nosotros</Link>
                        <Link to="/contacto" className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/contacto') ? 'text-primary font-bold underline underline-offset-4' : 'text-slate-600 dark:text-slate-300'}`}>Contacto</Link>
                        <Link to="/soluciones" className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/soluciones') ? 'text-primary font-bold underline underline-offset-4' : 'text-slate-600 dark:text-slate-300'}`}>Soluciones</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={openDrawer}
                            className="relative flex items-center cursor-pointer group p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-primary/20 transition-all border border-transparent hover:border-primary/30"
                        >
                            <ShoppingCart className="text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors" size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-lg animate-in zoom-in">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden md:block"></div>

                        <button className="hidden md:flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
                                <img
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZCuZTh-eR0cvv4qSr5Vdhr_ai3w01arTdlMOIuEceO1llyge4soCDNlh-UbSBBK2kMRgquSJiN94516dhsf2Hn1fzxE3p4hhb4rUHNrWJ0zjsWqoQ5m1sjpHOJGFZC7GFa1bDZoXaL30N4FdfVGoVAOrDCiHQlm1T3OiPE9PzPs7wPnAu0PVTXMpHxYDWyBCEJ5RDEuuFkSBS2ezhHkErLgdF19MAPFOCQaI_JgLcQgdOf3HU6jXJ__6igBGu2STvjZW3gx4IQQs"
                                />
                            </div>
                        </button>

                        <button
                            className="md:hidden p-2 text-slate-600 dark:text-slate-300"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-base font-medium ${isActive('/') ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-300'}`}>Inicio</Link>
                        <Link to="/catalogo" onClick={() => setIsMobileMenuOpen(false)} className={`text-base font-medium ${isActive('/catalogo') ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-300'}`}>Catálogo</Link>
                        <Link to="/nosotros" onClick={() => setIsMobileMenuOpen(false)} className={`text-base font-medium ${isActive('/nosotros') ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-300'}`}>Nosotros</Link>
                        <Link to="/contacto" onClick={() => setIsMobileMenuOpen(false)} className={`text-base font-medium ${isActive('/contacto') ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-300'}`}>Contacto</Link>
                        <Link to="/soluciones" onClick={() => setIsMobileMenuOpen(false)} className={`text-base font-medium ${isActive('/soluciones') ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-300'}`}>Soluciones</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
