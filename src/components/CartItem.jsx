import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <tr className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
            <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                    <div className="size-16 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{item.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase">
                                SKU: {item.sku}
                            </span>
                            <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">
                                {item.categoryName || 'Industrial'}
                            </span>
                        </div>
                        {item.variantDetails && (
                            <p className="text-xs text-slate-500 mt-1">{item.variantDetails}</p>
                        )}
                    </div>
                </div>
            </td>
            <td className="px-6 py-5">
                <div className="text-sm space-y-1">
                    <p><span className="text-slate-400 font-medium">Material:</span> <span className="font-semibold">{item.variantDetails?.split('|')[0]?.replace('Material:', '').trim() || 'Estándar'}</span></p>
                </div>
            </td>
            <td className="px-6 py-5">
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg w-32 overflow-hidden bg-white dark:bg-slate-800">
                    <button
                        onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                        className="flex-1 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="w-10 h-9 flex items-center justify-center text-sm font-bold border-x border-slate-200 dark:border-slate-700">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                        className="flex-1 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
                    >
                        <Plus size={14} />
                    </button>
                </div>
            </td>
            <td className="px-6 py-5 text-right">
                <button
                    onClick={() => removeFromCart(item.sku)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                    <Trash2 size={18} />
                </button>
            </td>
        </tr>
    );
};

export default CartItem;
