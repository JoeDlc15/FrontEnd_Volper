import React from 'react';
import { ShieldCheck, Truck, ShoppingCart } from 'lucide-react';

const ProductInfo = ({ product, viewCount }) => {
    return (
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">{product.name}</h1>

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
