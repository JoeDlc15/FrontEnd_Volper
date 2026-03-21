import React from 'react';
import { Search, X, Plus, Minus, ShoppingCart } from 'lucide-react';

const VariantRow = React.memo(({
    variant,
    qty,
    inCart,
    productName,
    setRowQuantity,
    handleInlineAddToCart,
    showIndividualCart,
    isMobile = false
}) => {

    if (!isMobile) {
        return (
            <tr
                className={`hidden md:table-row transition-colors group hover:bg-primary/5 
                ${inCart ? 'bg-amber-50 dark:bg-amber-900/10 border-l-4 border-l-amber-400' : ''}
                ${variant.stock <= 0 ? 'opacity-50' : ''}`}
            >
                <td className="px-6 py-4 font-mono text-xs font-bold text-primary">
                    <div className="flex items-center gap-2">
                        {variant.sku}
                        {inCart && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-black">
                                <ShoppingCart size={10} />
                                {inCart.quantity}
                            </span>
                        )}
                    </div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-700 dark:text-slate-300 font-semibold">{variant.name || productName}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${variant.stock > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'}`}>
                        {variant.stock > 0 ? 'Disponible' : 'Sin Stock'}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900 h-9">
                            <button
                                onClick={(e) => { e.stopPropagation(); setRowQuantity(variant.sku, qty - 10); }}
                                className="px-2 text-slate-400 hover:text-primary transition-colors h-full"
                                disabled={variant.stock <= 0}
                            >
                                <Minus size={12} />
                            </button>
                            <input
                                type="number"
                                min="0"
                                step="10"
                                value={qty || ''}
                                onChange={(e) => { e.stopPropagation(); setRowQuantity(variant.sku, parseInt(e.target.value) || 0); }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-10 text-center font-bold text-xs dark:text-white bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                placeholder="0"
                                disabled={variant.stock <= 0}
                            />
                            <button
                                onClick={(e) => { e.stopPropagation(); setRowQuantity(variant.sku, qty + 10); }}
                                className="px-2 text-slate-400 hover:text-primary transition-colors h-full"
                                disabled={variant.stock <= 0}
                            >
                                <Plus size={12} />
                            </button>
                        </div>
                    </div>
                </td>
                {showIndividualCart && (
                    <td className="px-6 py-4 text-center">
                        <button
                            onClick={(e) => handleInlineAddToCart(variant, e)}
                            disabled={variant.stock <= 0 || qty <= 0}
                            className={`inline-flex items-center justify-center w-9 h-9 rounded-xl transition-all ${variant.stock > 0 && qty > 0
                                ? 'bg-primary text-white hover:brightness-110 active:scale-90 shadow-md shadow-primary/20 cursor-pointer'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                }`}
                            title={inCart ? `Ya tienes ${inCart.quantity} en el carrito` : 'Añadir al carrito'}
                        >
                            <ShoppingCart size={16} />
                        </button>
                    </td>
                )}
            </tr>
        );
    }

    return (
        <div className={`md:hidden p-5 rounded-3xl border transition-all mb-4 bg-white dark:bg-slate-900 
            ${inCart ? 'border-primary ring-1 ring-primary/20 bg-primary/5' : 'border-slate-100 dark:border-slate-800 shadow-sm'}`}>

            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CÓDIGO</p>
                    <h4 className="text-sm font-black text-primary">{variant.sku}</h4>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${variant.stock > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'}`}>
                    {variant.stock > 0 ? 'Disponible' : 'Sin Stock'}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nombre / Medida</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{variant.name || productName}</p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 h-10 px-1">
                    <button
                        onClick={() => setRowQuantity(variant.sku, qty - 10)}
                        className="w-10 h-full flex items-center justify-center text-slate-400"
                        disabled={variant.stock <= 0}
                    >
                        <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-black text-sm dark:text-white">{qty}</span>
                    <button
                        onClick={() => setRowQuantity(variant.sku, qty + 10)}
                        className="w-10 h-full flex items-center justify-center text-slate-400"
                        disabled={variant.stock <= 0}
                    >
                        <Plus size={14} />
                    </button>
                </div>

                {showIndividualCart ? (
                    <button
                        onClick={(e) => handleInlineAddToCart(variant, e)}
                        disabled={variant.stock <= 0 || qty <= 0}
                        className="flex-1 h-10 bg-primary text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                        <ShoppingCart size={16} />
                        Cotizar
                    </button>
                ) : (
                    <div className="text-right flex-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado</p>
                        <p className={`text-[11px] font-black ${variant.stock > 0 ? 'text-green-600' : 'text-rose-600'}`}>
                            {variant.stock > 0 ? 'Disponible' : 'Sin Stock'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
});

const TechnicalTable = ({
    variants,
    measureTypes,
    selectedMeasureType,
    setSelectedMeasureType,
    measureSearch,
    setMeasureSearch,
    getRowQuantity,
    setRowQuantity,
    handleInlineAddToCart,
    handleBulkAddToCart,
    getCartItem,
    productName,
    rowQuantities
}) => {
    const [multiSelect, setMultiSelect] = React.useState(false);

    // Contar SKUs seleccionados (no la suma de cantidades)
    const selectedSkusCount = Object.values(rowQuantities || {}).filter(q => q > 0).length;

    return (
        <section className="mb-24 relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-6 pt-8 border-t border-slate-100 dark:border-slate-900">
                <div>
                    <h3 className="text-2xl font-bold font-display mb-1">Especificaciones Técnicas</h3>
                    <p className="text-sm text-slate-500 font-medium">
                        Modelos industriales disponibles para selección de precisión.
                    </p>
                </div>

                {/* Switch de Selección Múltiple */}
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-2 pl-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Selección Múltiple</span>
                    <button
                        onClick={() => setMultiSelect(!multiSelect)}
                        className={`w-12 h-6 rounded-full transition-all relative ${multiSelect ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${multiSelect ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>
            </div>

            {/* Botón Flotante / Sticky para Selección Masiva */}
            {multiSelect && selectedSkusCount > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-8">
                    <button
                        onClick={handleBulkAddToCart}
                        className="flex items-center gap-4 px-8 py-4 bg-primary text-white font-black rounded-2xl hover:brightness-110 active:scale-95 transition-all shadow-2xl shadow-primary/40 border-2 border-white/20"
                    >
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <ShoppingCart size={18} />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] uppercase tracking-tighter opacity-80 leading-none mb-0.5">Listos para añadir</p>
                            <p className="text-sm leading-none">{selectedSkusCount} {selectedSkusCount === 1 ? 'modelo seleccionado' : 'modelos seleccionados'}</p>
                        </div>
                    </button>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                {measureTypes.length > 1 && (
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 text-[10px]">Filtrar por:</span>
                        <button
                            onClick={() => {
                                setSelectedMeasureType('all');
                                setMeasureSearch('');
                            }}
                            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${selectedMeasureType === 'all' && !measureSearch
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
                                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${selectedMeasureType === type && !measureSearch
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
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={14} />
                    <input
                        id="measure-search"
                        type="search"
                        placeholder="Buscar medida..."
                        value={measureSearch}
                        onChange={(e) => setMeasureSearch(e.target.value)}
                        className="w-full h-10 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-primary/20 rounded-2xl pl-12 pr-4 text-xs font-bold outline-none transition-all shadow-sm"
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

            <div className="overflow-hidden rounded-3xl md:border md:border-slate-200 md:dark:border-slate-800 md:shadow-sm">
                {/* Desktop View */}
                <table className="w-full text-left hidden md:table">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-primary tracking-widest">SKU / Modelo</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Nombre Pieza</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Estado</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-primary tracking-widest text-center">Cantidad</th>
                            {!multiSelect && <th className="px-6 py-4 text-[10px] font-black uppercase text-primary tracking-widest text-center">Acción</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-900 bg-white dark:bg-slate-950">
                        {variants.map((v) => (
                            <VariantRow
                                key={`desktop-${v.sku}`}
                                variant={v}
                                qty={getRowQuantity(v.sku)}
                                inCart={getCartItem(v.sku)}
                                productName={productName}
                                setRowQuantity={setRowQuantity}
                                handleInlineAddToCart={handleInlineAddToCart}
                                showIndividualCart={!multiSelect}
                                isMobile={false}
                            />
                        ))}
                    </tbody>
                </table>

                {/* Mobile View */}
                <div className="md:hidden space-y-4">
                    {variants.map((v) => (
                        <VariantRow
                            key={`mobile-${v.sku}`}
                            variant={v}
                            qty={getRowQuantity(v.sku)}
                            inCart={getCartItem(v.sku)}
                            productName={productName}
                            setRowQuantity={setRowQuantity}
                            handleInlineAddToCart={handleInlineAddToCart}
                            showIndividualCart={!multiSelect}
                            isMobile={true}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechnicalTable;
