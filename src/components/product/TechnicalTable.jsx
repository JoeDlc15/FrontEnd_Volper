import React from 'react';
import { Search, X, Plus, Minus, ShoppingCart } from 'lucide-react';

const TechnicalTable = ({
    variants,
    measureTypes,
    selectedMeasureType,
    setSelectedMeasureType,
    measureSearch,
    setMeasureSearch,
    selectedVariant,
    getRowQuantity,
    setRowQuantity,
    handleInlineAddToCart,
    getCartItem,
    productName
}) => {
    return (
        <section className="mb-24">
            <div className="flex flex-col mb-8">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold font-display">Especificaciones Técnicas</h3>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-lg">
                        Modelos Disponibles
                    </span>
                </div>
                <p className={`text-sm font-medium ${!selectedVariant ? 'text-amber-600 dark:text-amber-400 animate-pulse' : 'text-slate-500'}`}>
                    {selectedVariant ? `Seleccionaste el modelo: ${selectedVariant.sku}` : 'Por favor, selecciona una medida de la tabla para añadir al carrito.'}
                </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                {measureTypes.length > 1 && (
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Tipo de Medida:</span>
                        <button
                            onClick={() => {
                                setSelectedMeasureType('all');
                                setMeasureSearch('');
                            }}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${selectedMeasureType === 'all' && !measureSearch
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                        >
                            Todos ({variants?.length})
                        </button>
                        {measureTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => {
                                    setSelectedMeasureType(type);
                                    setMeasureSearch('');
                                }}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${selectedMeasureType === type && !measureSearch
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {type} ({variants?.filter(v => v.measureType === type).length})
                            </button>
                        ))}
                    </div>
                )}

                <div className="relative group min-w-[300px] md:ml-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                    <input
                        id="measure-search"
                        type="text"
                        placeholder="Buscador rápido de medida... (ej: 1/4)"
                        value={measureSearch}
                        onChange={(e) => setMeasureSearch(e.target.value)}
                        className="w-full h-11 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-primary/20 rounded-2xl pl-12 pr-4 text-xs font-bold outline-none transition-all shadow-sm"
                    />
                    <label htmlFor="measure-search" className="sr-only">Buscador rápido de medida</label>
                    {measureSearch && (
                        <button
                            onClick={() => setMeasureSearch('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                            <th className="px-6 py-5 text-sm font-black uppercase text-primary tracking-wider">SKU / Modelo</th>
                            <th className="px-6 py-5 text-sm font-black uppercase text-slate-500 tracking-wider">Nombre Pieza</th>
                            <th className="px-6 py-5 text-sm font-black uppercase text-slate-500 tracking-wider">Estado</th>
                            <th className="px-6 py-5 text-sm font-black uppercase text-primary tracking-wider text-center">Cantidad</th>
                            <th className="px-6 py-5 text-sm font-black uppercase text-primary tracking-wider text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-900 bg-white dark:bg-slate-950">
                        {variants.map((v) => {
                            const inCart = getCartItem(v.sku);
                            const qty = getRowQuantity(v.sku);
                            return (
                                <tr
                                    key={v.sku}
                                    className={`transition-colors group hover:bg-primary/5 
                                    ${inCart ? 'bg-amber-50 dark:bg-amber-900/10 border-l-4 border-l-amber-400' : ''}
                                    ${v.stock <= 0 ? 'opacity-50' : ''}`}
                                >
                                    <td className="px-6 py-4 font-mono text-sm font-bold text-primary">
                                        <div className="flex items-center gap-2">
                                            {v.sku}
                                            {inCart && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-black">
                                                    <ShoppingCart size={10} />
                                                    {inCart.quantity}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 font-semibold">{v.name || productName}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${v.stock > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'}`}>
                                            {v.stock > 0 ? 'Disponible' : 'Sin Stock'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900 h-10">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setRowQuantity(v.sku, qty - 1); }}
                                                    className="px-2.5 text-slate-400 hover:text-primary transition-colors h-full"
                                                    disabled={v.stock <= 0}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={qty}
                                                    onChange={(e) => { e.stopPropagation(); setRowQuantity(v.sku, parseInt(e.target.value) || 0); }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-10 text-center font-bold text-sm dark:text-white bg-transparent outline-none"
                                                    disabled={v.stock <= 0}
                                                />
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setRowQuantity(v.sku, qty + 1); }}
                                                    className="px-2.5 text-slate-400 hover:text-primary transition-colors h-full"
                                                    disabled={v.stock <= 0}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={(e) => handleInlineAddToCart(v, e)}
                                            disabled={v.stock <= 0 || qty <= 0}
                                            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all ${v.stock > 0 && qty > 0
                                                ? 'bg-primary text-white hover:brightness-110 active:scale-90 shadow-md shadow-primary/20 cursor-pointer'
                                                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                                }`}
                                            title={inCart ? `Ya tienes ${inCart.quantity} en el carrito` : 'Añadir al carrito'}
                                        >
                                            <ShoppingCart size={18} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default TechnicalTable;
