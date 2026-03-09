import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const { cart, isDrawerOpen, closeDrawer, removeFromCart, updateQuantity, cartCount } = useCart();

    if (!isDrawerOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={closeDrawer}
            />

            {/* Drawer Content */}
            <div className={`absolute inset-y-0 right-0 max-w-full flex sm:pl-10 transition-transform duration-500 ease-in-out`}>
                <div className="w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white dark:bg-slate-900 shadow-2xl">
                        {/* Header */}
                        <div className="flex-1 h-0 overflow-y-auto">
                            <div className="py-6 px-4 sm:px-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                                            <ShoppingBag size={20} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black font-display text-slate-900 dark:text-white">Tu Pedido</h2>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cartCount} productos</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeDrawer}
                                        className="size-10 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:rotate-90"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* List */}
                            <div className="mt-8 px-4 sm:px-6">
                                {cart.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-300">
                                            <ShoppingBag size={32} />
                                        </div>
                                        <p className="text-slate-500 font-medium">No has agregado nada aún.</p>
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {cart.map((product) => (
                                            <li key={product.sku} className="py-6 flex group">
                                                <div className="size-24 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 border border-slate-100 dark:border-slate-800 group-hover:border-primary/30 transition-all">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="h-full w-full object-contain"
                                                    />
                                                </div>

                                                <div className="ml-4 flex-1 flex flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white">
                                                            <h3 className="line-clamp-1">{product.name}</h3>
                                                        </div>
                                                        <p className="mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">SKU: {product.sku}</p>
                                                        {product.variantDetails && (
                                                            <p className="mt-0.5 text-[10px] text-slate-500 truncate">{product.variantDetails}</p>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 flex items-end justify-between">
                                                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                                                            <button
                                                                onClick={() => updateQuantity(product.sku, product.quantity - 1)}
                                                                className="px-2 py-1 text-slate-400 hover:text-primary transition-colors"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="px-2 text-sm font-bold dark:text-white">{product.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(product.sku, product.quantity + 1)}
                                                                className="px-2 py-1 text-slate-400 hover:text-primary transition-colors"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => removeFromCart(product.sku)}
                                                            className="flex items-center gap-1 text-xs font-black text-rose-500 hover:text-rose-600 uppercase tracking-widest transition-colors"
                                                        >
                                                            <Trash2 size={14} /> Eliminar
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="border-t border-slate-100 dark:border-slate-800 py-6 px-4 sm:px-6 bg-slate-50 dark:bg-slate-800/30">
                                <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white mb-6">
                                    <p className="uppercase tracking-widest text-xs text-slate-400">Productos seleccionados</p>
                                    <p className="text-2xl text-primary">{cartCount} items</p>
                                </div>
                                <div className="space-y-3">
                                    <Link
                                        to="/cart"
                                        onClick={closeDrawer}
                                        className="w-full flex items-center justify-center px-6 py-4 border-2 border-primary text-primary rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-slate-900 transition-all"
                                    >
                                        Ver Carrito Detallado
                                    </Link>
                                    <Link
                                        to="/cart"
                                        onClick={closeDrawer}
                                        className="w-full flex items-center justify-center px-6 py-4 bg-primary text-slate-950 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:brightness-110 transition-all"
                                    >
                                        Solicitar Cotización <ArrowRight className="ml-2" size={16} />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
