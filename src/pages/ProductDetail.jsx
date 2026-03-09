import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronRight, Plus, Minus, ShoppingCart, ShieldCheck, Truck, ChevronLeft, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductById, registerProductView } from '../services/api';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
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

    const handleAddToCart = () => {
        if (product && selectedVariant) {
            const variantDetails = selectedVariant.dimensions
                .map(d => `${d.dimensionName}: ${d.dimensionValue}`)
                .join(', ');

            addToCart({
                ...product,
                name: selectedVariant.name || product.name,
                sku: selectedVariant.sku,
                variantDetails: `Material: ${selectedVariant.material || 'Estándar'} | ${variantDetails}`,
                quantity
            });
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

                        <div className="border-y border-slate-100 dark:border-slate-900 py-10 mb-10">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-2xl h-16 bg-slate-50 dark:bg-slate-900 w-full sm:w-auto">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-6 text-slate-500 hover:text-primary transition-colors h-full"
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <span className="w-16 text-center font-bold text-xl dark:text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-6 text-slate-500 hover:text-primary transition-colors h-full"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={!selectedVariant}
                                    className={`flex-1 w-full h-16 rounded-2xl font-black text-base tracking-widest flex items-center justify-center gap-3 transition-all ${selectedVariant
                                        ? 'bg-primary text-slate-950 uppercase hover:brightness-110 active:scale-95 shadow-xl shadow-primary/20 cursor-pointer'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700'
                                        }`}
                                >
                                    <ShoppingCart size={20} />
                                    {selectedVariant ? 'Añadir al Carrito' : 'Selecciona un Modelo'}
                                </button>
                            </div>
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
                                    <th className="px-8 py-5 text-sm font-black uppercase text-primary tracking-wider">SKU / Modelo</th>
                                    <th className="px-8 py-5 text-sm font-black uppercase text-slate-500 tracking-wider">Nombre Pieza</th>
                                    <th className="px-8 py-5 text-sm font-black uppercase text-slate-500 tracking-wider">Dimensiones</th>
                                    <th className="px-8 py-5 text-sm font-black uppercase text-slate-500 tracking-wider">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-900 bg-white dark:bg-slate-950">
                                {filteredVariants.map((v) => (
                                    <tr
                                        key={v.sku}
                                        onClick={() => v.stock > 0 && setSelectedVariant({ ...v, material: product.measures.find(m => m.code === v.sku)?.material || v.material })}
                                        className={`transition-colors cursor-pointer group hover:bg-primary/5 ${selectedVariant?.sku === v.sku ? 'bg-primary/10 border-l-4 border-l-primary' : ''} ${v.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <td className="px-8 py-5 font-mono text-sm font-bold text-primary">{v.sku}</td>
                                        <td className="px-8 py-5 text-sm text-slate-700 dark:text-slate-300 font-semibold">{v.name || product.name}</td>
                                        <td className="px-8 py-5 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                                                {v.dimensions.map(d => (
                                                    <span key={d.id} className="inline-flex items-center">
                                                        <span className="text-[10px] font-black uppercase text-slate-400 mr-2">{d.dimensionName}:</span>
                                                        <span className="font-bold text-slate-700 dark:text-slate-200">{d.dimensionValue}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${v.stock > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'}`}>
                                                {v.stock > 0 ? 'Disponible' : 'Sin Stock'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
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
        </div>
    );
};

export default ProductDetail;
