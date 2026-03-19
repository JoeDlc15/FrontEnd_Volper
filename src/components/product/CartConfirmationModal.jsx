import React from 'react';
import { X, ShoppingBasket, Plus } from 'lucide-react';

const CartConfirmationModal = ({ isOpen, variant, qtyToAdd, currentQty, onConfirm, onClose, onOpenDrawer }) => {
    if (!isOpen || !variant) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                        <ShoppingBasket size={32} strokeWidth={2.5} />
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                        Producto ya en la lista
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-8">
                        Este producto ya se encuentra en tu lista de cotización.<br className="hidden sm:block" />
                        ¿Deseas añadir <span className="font-bold text-slate-700 dark:text-slate-300">{qtyToAdd}</span> unidades más o mantener la cantidad actual de <span className="font-bold text-slate-700 dark:text-slate-300">{currentQty}</span>?
                    </p>

                    <div className="flex flex-col gap-3 w-full">
                        <button
                            onClick={() => onConfirm(variant, qtyToAdd)}
                            className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
                        >
                            <Plus size={20} strokeWidth={3} /> Añadir más unidades
                        </button>

                        <button
                            onClick={onClose}
                            className="w-full h-14 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl transition-colors active:scale-[0.98]"
                        >
                            Mantener igual
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            onClose();
                            onOpenDrawer();
                        }}
                        className="mt-8 text-sm font-semibold text-slate-400 hover:text-emerald-500 transition-colors border-b border-transparent hover:border-emerald-500 pb-0.5"
                    >
                        Ver mi lista actual
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartConfirmationModal;
