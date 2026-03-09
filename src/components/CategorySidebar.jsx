import React from 'react';
import { Layers, Settings, Wrench, Package, Box, Filter, X } from 'lucide-react';

// Diccionario de íconos estáticos para no tocar la Base de Datos
const iconMap = {
    'all': Box,
    'conexiones-bronce': Settings,
    'empaquetaduras-motor': Layers,
    'bombas-inyeccion': Wrench,
    'repuestos-varios': Package,
};

const CategorySidebar = ({ categories = [], selectedCategory, setSelectedCategory, isOpen, onClose }) => {
    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside className={`fixed md:relative top-0 left-0 h-full md:h-auto w-[280px] md:w-52 flex-shrink-0 z-50 md:z-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}>
                <div className="bg-white dark:bg-slate-800 h-full md:h-auto rounded-none md:rounded-2xl border-r md:border border-slate-200 dark:border-slate-700 p-5 md:p-4 md:sticky md:top-24 overflow-y-auto shadow-2xl md:shadow-none">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                            <Filter size={18} className="text-primary" />
                            <h2 className="font-bold text-lg">Filtrar por</h2>
                        </div>
                        <button onClick={onClose} className="md:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {categories.map((cat) => {
                            // Busca el ícono por el ID (slug), o usa Package por defecto
                            const Icon = iconMap[cat.id] || Package;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${selectedCategory === cat.id
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-primary'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="font-medium text-xs">{cat.name}</span>
                                </button>
                            );
                        })}
                    </nav>

                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Ayuda Técnica</h3>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                                ¿No encuentra la medida correcta? Chatee con nuestros expertos.
                            </p>
                            <button className="text-primary text-xs font-bold hover:underline">
                                Contactar Soporte
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default CategorySidebar;
