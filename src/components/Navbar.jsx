import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Search, ShoppingCart, User, Menu, X, Moon, Sun, Phone, Mail, LogOut, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import AuthModal from './AuthModal';

const Navbar = () => {
    const { isDark, toggleDarkMode } = useTheme() || {};
    const { cartCount = 0, openDrawer } = useCart() || {};
    const { user, logout } = useAuth();
    const location = useLocation() || { pathname: '/' };
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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

                        {/* User Profile / Auth Button */}
                        <div className="relative hidden md:block">
                            {user ? (
                                <div>
                                    <button
                                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                        className="flex items-center gap-2 group p-1 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {user.name.split(' ')[0]}
                                        </span>
                                    </button>

                                    {/* Profile Dropdown */}
                                    {isProfileDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 animate-in slide-in-from-top-2">
                                            <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 mb-2">
                                                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user.name}</p>
                                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                            </div>
                                            <Link
                                                to="/mi-cuenta/perfil"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                                className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 transition-colors"
                                            >
                                                <User size={16} /> Mi Cuenta
                                            </Link>
                                            <Link
                                                to="/mi-cuenta/pedidos"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                                className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 transition-colors"
                                            >
                                                <ShoppingBag size={16} /> Mis Cotizaciones
                                            </Link>
                                            <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                                            <button
                                                onClick={() => { logout(); setIsProfileDropdownOpen(false); }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                                            >
                                                <LogOut size={16} /> Cerrar Sesión
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsAuthModalOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-medium transition-colors"
                                >
                                    <User size={18} />
                                    <span>Ingresar</span>
                                </button>
                            )}
                        </div>

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
                    <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl py-4 flex flex-col animate-in slide-in-from-top-2">

                        {/* Mobile Auth Status */}
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 mb-2 bg-slate-50 dark:bg-slate-800/50">
                            {user ? (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="p-2 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                            <LogOut size={18} />
                                        </button>
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        <Link
                                            to="/mi-cuenta/perfil"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex flex-col items-center gap-1 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400"
                                        >
                                            <User size={16} className="text-primary" /> Perfil
                                        </Link>
                                        <Link
                                            to="/mi-cuenta/pedidos"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex flex-col items-center gap-1 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400"
                                        >
                                            <ShoppingBag size={16} className="text-primary" /> Cotizaciones
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <button
                                    onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
                                    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-primary text-white rounded-xl font-medium"
                                >
                                    <User size={18} /> Ingresar o Crear Cuenta
                                </button>
                            )}
                        </div>

                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`px - 6 py - 2 text - base font - medium ${isActive('/') ? 'text-primary' : 'text-slate-600 dark:text-slate-300'} `}>Inicio</Link>
                        <Link to="/catalogo" onClick={() => setIsMobileMenuOpen(false)} className={`px - 6 py - 2 text - base font - medium ${isActive('/catalogo') ? 'text-primary' : 'text-slate-600 dark:text-slate-300'} `}>Catálogo</Link>
                        <Link to="/nosotros" onClick={() => setIsMobileMenuOpen(false)} className={`px - 6 py - 2 text - base font - medium ${isActive('/nosotros') ? 'text-primary' : 'text-slate-600 dark:text-slate-300'} `}>Nosotros</Link>
                        <Link to="/contacto" onClick={() => setIsMobileMenuOpen(false)} className={`px - 6 py - 2 text - base font - medium ${isActive('/contacto') ? 'text-primary' : 'text-slate-600 dark:text-slate-300'} `}>Contacto</Link>
                        <Link to="/soluciones" onClick={() => setIsMobileMenuOpen(false)} className={`px - 6 py - 2 text - base font - medium ${isActive('/soluciones') ? 'text-primary' : 'text-slate-600 dark:text-slate-300'} `}>Soluciones</Link>
                    </div>
                )}
            </nav>

            {/* Modal de Autenticación */}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </header>
    );
};

export default Navbar;
