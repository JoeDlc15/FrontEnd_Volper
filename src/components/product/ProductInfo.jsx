import React from 'react';
import { ShieldCheck, Truck, ShoppingCart, Star } from 'lucide-react';
import { useFavorites } from '../../context/FavoriteContext';

const ProductInfo = ({ product, viewCount }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favActive = isFavorite(product.id);

    return (
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 flex-1">{product.name}</h1>
                <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`ml-4 p-3 rounded-2xl border transition-all flex items-center gap-2 font-black uppercase tracking-widest text-[10px] shadow-sm ${favActive ? 'bg-yellow-50 border-yellow-200 text-yellow-600 dark:bg-yellow-950/20 dark:border-yellow-900/30' : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-primary hover:border-primary/30 dark:bg-slate-900 dark:border-slate-800'}`}
                    title={favActive ? "Quitar de favoritos" : "Añadir a favoritos"}
                >
                    <Star size={16} fill={favActive ? "currentColor" : "none"} />
                    {favActive ? 'Favorito' : 'Favorito'}
                </button>
            </div>

            <div className="flex items-center gap-6 mb-8">
                <span className="text-slate-400 text-sm font-medium">SKU: {product.sku}</span>
                <span className="text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-6 text-sm">
                    {viewCount} visualizaciones
                </span>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
                {product.description}
            </p>

            <div className="border-y border-slate-100 dark:border-slate-900 py-6 mb-10">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Selecciona la cantidad y presiona el botón <ShoppingCart size={14} className="inline text-primary" /> en la tabla para añadir al carrito.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-900">
                    <ShieldCheck className="text-primary" size={24} />
                    <span className="text-sm font-bold opacity-80 uppercase tracking-tight">ISO 9001 Cert</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-900">
                    <Truck className="text-primary" size={24} />
                    <span className="text-sm font-bold opacity-80 uppercase tracking-tight">Stock Inmediato</span>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
