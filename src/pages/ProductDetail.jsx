import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronRight, Plus, Minus, ShoppingCart, ShoppingBasket, ShieldCheck, Truck, ChevronLeft, Loader2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductById, registerProductView } from '../services/api';

const ProductDetail = () => {
    const { id } = useParams();
    const { cart, addToCart, openDrawer } = useCart();
    const [rowQuantities, setRowQuantities] = useState({});
    const [cartModal, setCartModal] = useState({ isOpen: false, variant: null, qtyToAdd: 0 });
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [viewCount, setViewCount] = useState(0);
    const [selectedMeasureType, setSelectedMeasureType] = useState('all');

    // Compute unique measure types from product variants
    const measureTypes = useMemo(() => {
        if (!product?.variants) return [];
        return [...new Set(product.variants.map(v => v.measureType).filter(Boolean))];
    }, [product]);

    // Filter variants based on selected measure type
    const filteredVariants = useMemo(() => {
        if (!product?.variants) return [];
        if (selectedMeasureType === 'all') return product.variants;
        return product.variants.filter(v => v.measureType === selectedMeasureType);
    }, [product, selectedMeasureType]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const data = await getProductById(id);
            if (data) {
                // Registrar visualización única y obtener el conteo
                const viewData = await registerProductView(id);
                if (viewData) {
                    setViewCount(viewData.viewCount);
                }

                // Map backend structure to frontend
                const mappedProduct = {
                    ...data,
                    category: data.category?.slug || 'unknown',
                    categoryName: data.category?.name || 'Otro',
                    image: data.images && data.images.length > 0 ? data.images[0].url : '',
                    images: data.images || [],
                    rating: 4.8, // Fallback as backend doesn't have it yet
                    measures: data.variants?.flatMap(v =>
                        v.dimensions.map(d => ({
                            code: v.sku,
                            internal: d.dimensionName === 'Ø Interno' ? d.dimensionValue : '-',
                            external: d.dimensionName === 'Ø Externo' ? d.dimensionValue : '-',
                            thickness: d.dimensionName === 'Espesor' ? d.dimensionValue : '-',
                            material: v.material || 'Estándar',
                            stock: v.stock > 0
                        }))
                    ).reduce((acc, current) => {
                        // Group by SKU
                        const existing = acc.find(item => item.code === current.code);
                        if (existing) {
                            if (current.internal !== '-') existing.internal = current.internal;
                            if (current.external !== '-') existing.external = current.external;
                            if (current.thickness !== '-') existing.thickness = current.thickness;
                            if (current.material !== 'Estándar' && current.material !== '-') existing.material = current.material;
                        } else {
                            acc.push(current);
                        }
                        return acc;
                    }, []) || []
                };
                setProduct(mappedProduct);
                if (mappedProduct.images.length > 0) {
                    setMainImage(mappedProduct.images[0].url);
                }
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    // Check if a variant SKU is already in the cart
    const getCartItem = (sku) => cart.find(item => item.sku === sku);

    // Get/set quantity for a specific row
    const getRowQuantity = (sku) => rowQuantities[sku] || 0;
    const setRowQuantity = (sku, qty) => {
        setRowQuantities(prev => ({ ...prev, [sku]: Math.max(0, qty) }));
    };

    const confirmAddToCart = (variant, qty) => {
        const variantDetails = variant.dimensions
            .map(d => `${d.dimensionName}: ${d.dimensionValue}`)
            .join(', ');

        addToCart({
            ...product,
            name: variant.name || product.name,
            sku: variant.sku,
            variantDetails: `Material: ${variant.material || 'Estándar'} | ${variantDetails}`,
            quantity: qty
        });

        setCartModal({ isOpen: false, variant: null, qtyToAdd: 0 });
        setRowQuantity(variant.sku, 0); // Reset local row quantity
    };

    const handleInlineAddToCart = (variant, e) => {
        e.stopPropagation();
        const qty = getRowQuantity(variant.sku);
        if (product && variant.stock > 0 && qty > 0) {
            const inCart = getCartItem(variant.sku);
            if (inCart) {
                setCartModal({ isOpen: true, variant, qtyToAdd: qty });
                return;
            }
            confirmAddToCart(variant, qty);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
                <Loader2 className="animate-spin text-primary mb-4" size={48} />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Cargando especificaciones...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 p-20 text-center">
                <h2 className="text-3xl font-bold mb-4">Producto no encontrado</h2>
                <Link to="/catalogo" className="bg-primary px-8 py-4 rounded-xl font-bold">Volver al catálogo</Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen">
            <main className="max-w-7xl mx-auto px-6 md:px-20 py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-10 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <Link to="/" className="hover:text-primary">Inicio</Link>
                    <ChevronRight size={14} />
                    <Link to="/catalogo" className="hover:text-primary">{product.categoryName}</Link>
                    <ChevronRight size={14} />
                    <span className="text-slate-900 dark:text-slate-100 font-bold">{product.name}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-16 mb-24">
                    {/* Image Gallery */}
                    <div className="flex flex-col md:flex-row gap-6 w-full lg:w-1/2">
                        <div className="flex flex-row md:flex-col gap-3 shrink-0 order-2 md:order-1 overflow-x-auto md:overflow-y-auto max-h-[500px] hide-scrollbar pb-2 md:pb-0">
                            {product.images?.map((img, i) => (
                                <div
                                    key={img.id}
                                    onClick={() => setMainImage(img.url)}
                                    className={`size-20 shrink-0 rounded-xl border-2 ${mainImage === img.url ? 'border-primary' : 'border-slate-200 dark:border-slate-800'} overflow-hidden cursor-pointer hover:border-primary/50 transition-all`}
                                >
                                    <img
                                        src={img.url}
                                        alt={`Thumbnail ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="grow aspect-square bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden order-1 md:order-2">
                            <img
                                src={mainImage || product.image}
                                alt={product.name}
                                className="w-full h-full object-contain p-4"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">{product.name}</h1>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full">
                                <span className="text-primary font-bold text-sm">{product.rating}</span>
                                <div className="flex text-amber-500">
                                    <Star size={14} fill="currentColor" />
                                </div>
                            </div>
                            <span className="text-slate-400 text-sm font-medium">SKU: {product.sku}</span>
                            <span className="text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-6 text-sm">{viewCount} visualizaciones</span>
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
                </div>

                {/* Technical Data Table */}
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

                    {/* MeasureType Filter Buttons */}
                    {measureTypes.length > 1 && (
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Tipo de Medida:</span>
                            <button
                                onClick={() => setSelectedMeasureType('all')}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${selectedMeasureType === 'all'
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                            >
                                Todos ({product.variants?.length})
                            </button>
                            {measureTypes.map(type => {
                                const count = product.variants?.filter(v => v.measureType === type).length;
                                return (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedMeasureType(type)}
                                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${selectedMeasureType === type
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                            }`}
                                    >
                                        {type} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    )}

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
                                {filteredVariants.map((v) => {
                                    const inCart = getCartItem(v.sku);
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
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 font-semibold">{v.name || product.name}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${v.stock > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'}`}>
                                                    {v.stock > 0 ? 'Disponible' : 'Sin Stock'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center">
                                                    <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900 h-10">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); setRowQuantity(v.sku, getRowQuantity(v.sku) - 1); }}
                                                            className="px-2.5 text-slate-400 hover:text-primary transition-colors h-full"
                                                            disabled={v.stock <= 0}
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={getRowQuantity(v.sku)}
                                                            onChange={(e) => { e.stopPropagation(); setRowQuantity(v.sku, parseInt(e.target.value) || 0); }}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="w-10 text-center font-bold text-sm dark:text-white bg-transparent outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                            disabled={v.stock <= 0}
                                                        />
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); setRowQuantity(v.sku, getRowQuantity(v.sku) + 1); }}
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
                                                    disabled={v.stock <= 0 || getRowQuantity(v.sku) <= 0}
                                                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all ${v.stock > 0 && getRowQuantity(v.sku) > 0
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

                {/* Back Button */}
                <Link
                    to="/catalogo"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:brightness-110 transition-all"
                >
                    <ChevronLeft size={20} /> Volver al Catálogo
                </Link>
            </main>

            {/* Custom Modal para Producto ya en el carrito */}
            {cartModal.isOpen && cartModal.variant && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setCartModal({ isOpen: false, variant: null, qtyToAdd: 0 })}
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
                                ¿Deseas añadir <span className="font-bold text-slate-700 dark:text-slate-300">{cartModal.qtyToAdd}</span> unidades más o mantener la cantidad actual de <span className="font-bold text-slate-700 dark:text-slate-300">{getCartItem(cartModal.variant.sku)?.quantity}</span>?
                            </p>

                            <div className="flex flex-col gap-3 w-full">
                                <button
                                    onClick={() => confirmAddToCart(cartModal.variant, cartModal.qtyToAdd)}
                                    className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
                                >
                                    <Plus size={20} strokeWidth={3} /> Añadir más unidades
                                </button>

                                <button
                                    onClick={() => setCartModal({ isOpen: false, variant: null, qtyToAdd: 0 })}
                                    className="w-full h-14 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl transition-colors active:scale-[0.98]"
                                >
                                    Mantener igual
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    setCartModal({ isOpen: false, variant: null, qtyToAdd: 0 });
                                    openDrawer();
                                }}
                                className="mt-8 text-sm font-semibold text-slate-400 hover:text-emerald-500 transition-colors border-b border-transparent hover:border-emerald-500 pb-0.5"
                            >
                                Ver mi lista actual
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
