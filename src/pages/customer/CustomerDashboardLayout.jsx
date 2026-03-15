import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, ShoppingBag, LogOut, ChevronRight, Settings } from 'lucide-react';

const CustomerDashboardLayout = () => {
    const { user, logout, loading } = useAuth();

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
        <div className="bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-80px)] py-10">
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
