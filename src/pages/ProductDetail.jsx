import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductById, registerProductView } from '../services/api';

// New Components
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import TechnicalTable from '../components/product/TechnicalTable';
import CartConfirmationModal from '../components/product/CartConfirmationModal';
import { ProductDetailSkeleton } from '../components/ui/Skeleton';

const ProductDetail = () => {
    const { id } = useParams();
    const { cart, addToCart, openDrawer } = useCart();
    const [rowQuantities, setRowQuantities] = useState({});
    const [cartModal, setCartModal] = useState({ isOpen: false, variant: null, qtyToAdd: 0 });
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState(null);
    const [viewCount, setViewCount] = useState(0);
    const [selectedMeasureType, setSelectedMeasureType] = useState('all');
    const [measureSearch, setMeasureSearch] = useState('');

    // Compute unique measure types from product variants
    const measureTypes = useMemo(() => {
        if (!product?.variants) return [];
        return [...new Set(product.variants.map(v => v.measureType).filter(Boolean))];
    }, [product]);

    // Filter variants based on selected measure type and search query
    const filteredVariants = useMemo(() => {
        if (!product?.variants) return [];

        const searchLower = measureSearch.toLowerCase().trim();
        const searchFiltered = product.variants.filter(v => {
            if (!searchLower) return true;
            const matchSku = v.sku.toLowerCase().includes(searchLower);
            const matchName = v.name?.toLowerCase().includes(searchLower);
            const matchDims = v.dimensions?.some(d => d.dimensionValue.toLowerCase().includes(searchLower));
            return matchSku || matchName || matchDims;
        });

        if (searchLower) return searchFiltered;
        if (selectedMeasureType === 'all') return searchFiltered;
        return searchFiltered.filter(v => v.measureType === selectedMeasureType);
    }, [product, selectedMeasureType, measureSearch]);

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            const data = await getProductById(id);
            if (data) {
                const viewData = await registerProductView(id);
                if (viewData) setViewCount(viewData.viewCount);

                const mappedProduct = {
                    ...data,
                    categoryName: data.category?.name || 'Otro',
                    images: data.images || [],
                };
                setProduct(mappedProduct);
                if (mappedProduct.images.length > 0) {
                    setMainImage(mappedProduct.images[0].url);
                }
            }
            setLoading(false);
        };
        fetchProductData();
    }, [id]);

    const getCartItem = (sku) => cart.find(item => item.sku === sku);
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
            price: parseFloat(variant.price) || 0,
            image: mainImage || (product.images && product.images[0]?.url) || '',
            variantDetails: `Material: ${variant.material || 'Estándar'} | ${variantDetails}`,
            quantity: qty
        });

        setCartModal({ isOpen: false, variant: null, qtyToAdd: 0 });
        setRowQuantity(variant.sku, 0);
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

    const handleBulkAddToCart = () => {
        const variantsWithQty = product.variants.filter(v => rowQuantities[v.sku] > 0 && v.stock > 0);

        if (variantsWithQty.length === 0) return;

        variantsWithQty.forEach(variant => {
            const qty = rowQuantities[variant.sku];
            const variantDetails = variant.dimensions
                .map(d => `${d.dimensionName}: ${d.dimensionValue}`)
                .join(', ');

            addToCart({
                ...product,
                name: variant.name || product.name,
                sku: variant.sku,
                price: parseFloat(variant.price) || 0,
                image: mainImage || (product.images && product.images[0]?.url) || '',
                variantDetails: `Material: ${variant.material || 'Estándar'} | ${variantDetails}`,
                quantity: qty
            });

            // Limpiar cantidad de la fila
            setRowQuantity(variant.sku, 0);
        });

        openDrawer();
    };
    if (loading) {
        return <ProductDetailSkeleton />;
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
                <nav className="flex items-center gap-2 mb-10 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <Link to="/" className="hover:text-primary">Inicio</Link>
                    <ChevronRight size={14} />
                    <Link to="/catalogo" className="hover:text-primary">{product.categoryName}</Link>
                    <ChevronRight size={14} />
                    <span className="text-slate-900 dark:text-slate-100 font-bold">{product.name}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-16 mb-24">
                    <ProductGallery
                        images={product.images}
                        mainImage={mainImage}
                        setMainImage={setMainImage}
                        productName={product.name}
                    />
                    <ProductInfo product={product} viewCount={viewCount} />
                </div>

                <TechnicalTable
                    variants={filteredVariants}
                    measureTypes={measureTypes}
                    selectedMeasureType={selectedMeasureType}
                    setSelectedMeasureType={setSelectedMeasureType}
                    measureSearch={measureSearch}
                    setMeasureSearch={setMeasureSearch}
                    getRowQuantity={getRowQuantity}
                    setRowQuantity={setRowQuantity}
                    handleInlineAddToCart={handleInlineAddToCart}
                    handleBulkAddToCart={handleBulkAddToCart}
                    getCartItem={getCartItem}
                    productName={product.name}
                    rowQuantities={rowQuantities}
                />

                <Link
                    to="/catalogo"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:brightness-110 transition-all"
                >
                    <ChevronLeft size={20} /> Volver al Catálogo
                </Link>
            </main>

            <CartConfirmationModal
                isOpen={cartModal.isOpen}
                variant={cartModal.variant}
                qtyToAdd={cartModal.qtyToAdd}
                currentQty={getCartItem(cartModal.variant?.sku)?.quantity}
                onConfirm={confirmAddToCart}
                onClose={() => setCartModal({ isOpen: false, variant: null, qtyToAdd: 0 })}
                onOpenDrawer={openDrawer}
            />
        </div>
    );
};

export default ProductDetail;
