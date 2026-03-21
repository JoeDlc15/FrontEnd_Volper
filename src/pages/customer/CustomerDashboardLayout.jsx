import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, ShoppingBag, LogOut, ChevronRight, Bell, X } from 'lucide-react';
import { io } from 'socket.io-client';

const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const SOCKET_URL = VITE_API_URL.replace('/api', '');

const CustomerDashboardLayout = () => {
    const { user, logout, loading } = useAuth();
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (!user) return;

        const socket = io(SOCKET_URL);

        socket.on('quote-status-updated', (data) => {
            // Solo mostrar si el email coincide con el del usuario logueado
            if (data.email === user.email) {
                const statusEmoji = {
                    in_review: '🛠️',
                    approved: '✅',
                    rejected: '❌',
                    cancelled: '⬜',
                    closed: '🔵'
                };

                setToast({
                    maskId: data.maskId,
                    statusLabel: data.statusLabel,
                    emoji: statusEmoji[data.status] || '📋',
                    note: data.adminNote,
                    timestamp: Date.now()
                });

                // Auto-dismiss después de 8 segundos
                setTimeout(() => {
                    setToast(prev => prev?.timestamp === Date.now() ? null : prev);
                }, 8000);
            }
        });

        return () => socket.disconnect();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    const navItems = [
        { path: '/mi-cuenta/perfil', label: 'Mi Perfil', icon: User },
        { path: '/mi-cuenta/pedidos', label: 'Mis Cotizaciones', icon: ShoppingBag },
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-80px)] py-10 relative">

            {/* Toast Notification */}
            {toast && (
                <div className="fixed top-6 right-6 z-[200] animate-in slide-in-from-top-4 fade-in duration-500 max-w-sm w-full">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-black/10 border border-slate-200 dark:border-slate-800 p-5 flex items-start gap-4">
                        <div className="text-2xl flex-shrink-0 mt-0.5">{toast.emoji}</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">
                                {toast.maskId}
                            </p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                Tu cotización fue actualizada a: <span className="text-primary">{toast.statusLabel}</span>
                            </p>
                            {toast.note && (
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                                    "{toast.note}"
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => setToast(null)}
                            className="p-1 text-slate-300 hover:text-slate-600 dark:hover:text-white transition-colors flex-shrink-0"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full md:w-72 flex-shrink-0">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center mb-6 text-center shadow-sm">
                            <div className="size-32 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center text-4xl mb-4 font-bold border-[6px] border-white dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-widest mb-1">Bienvenido</p>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 font-display">{user.name.split(' ')[0]}!</h2>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                            <nav className="flex flex-col py-2">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 px-6 py-4 text-sm font-bold transition-all border-l-4 ${isActive
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                                            }`
                                        }
                                    >
                                        <item.icon size={20} />
                                        {item.label}
                                        <ChevronRight size={16} className="ml-auto opacity-30" />
                                    </NavLink>
                                ))}
                                <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-6"></div>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-4 px-6 py-4 text-sm font-bold text-red-500/80 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors border-l-4 border-transparent"
                                >
                                    <LogOut size={20} />
                                    Cerrar sesión
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 h-full p-8 md:p-12 shadow-sm relative overflow-hidden">
                            <Outlet context={{ user }} />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboardLayout;
