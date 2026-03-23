import React, { useState, useEffect } from 'react';
import CategorySidebar from '../components/CategorySidebar';
import ProductCard from '../components/ProductCard';
import { Search, Loader2, Filter } from 'lucide-react';
import { getProducts } from '../services/api';
import { CatalogSkeleton } from '../components/ui/Skeleton';
import { useFavorites } from '../context/FavoriteContext';

const Catalog = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isFavorite } = useFavorites();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = await getProducts();
            // Map backend structure to frontend if needed
            const mappedData = data.map(p => ({
                ...p,
                category: p.category?.slug || 'unknown',
                categoryName: p.category?.name || 'Otro',
                categoryDescription: p.category?.description || '',
                image: p.images && p.images.length > 0 ? p.images[0].url : 'https://images.unsplash.com/photo-1581094288338-2314dddb7bc3?q=80&w=400'
            }));
            setProducts(mappedData);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p =>
        (selectedCategory === 'all' || p.category === selectedCategory) &&
        (p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const uniqueCategories = [
        { id: 'all', name: 'Todos los Productos' },
        ...Array.from(new Map(products.filter(p => p.category !== 'unknown').map(p => [p.category, { id: p.category, name: p.categoryName }])).values())
    ];

    if (loading) {
        return <CatalogSkeleton />;
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold font-display mb-2 md:mb-4">
                            {selectedCategory === 'all' ? 'Catálogo de Productos' : filteredProducts[0]?.categoryName || 'Catálogo de Productos'}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            {selectedCategory === 'all'
                                ? 'Explore nuestra amplia gama de componentes industriales de alta calidad.'
                                : filteredProducts[0]?.categoryDescription || 'Mostrando resultados filtrados para su selección.'}
                        </p>
                    </div>

                    {/* Botón de Filtros (Solo Móvil) */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="md:hidden self-start flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-700 dark:text-slate-200 shadow-sm"
                    >
                        <Filter size={18} />
                        Filtros
                    </button>
                </header>

                <div className="flex flex-col md:flex-row gap-8">
                    <CategorySidebar
                        categories={uniqueCategories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={(id) => {
                            setSelectedCategory(id);
                            setIsSidebarOpen(false); // Cierra el sidebar en móvil al seleccionar
                        }}
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />

                    <main className="flex-1">
                        {/* Search and Sort */}
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Buscar productos por nombre o código..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-slate-500 whitespace-nowrap">Mostrar: {filteredProducts.length} resultados</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                            {[...filteredProducts]
                                .sort((a, b) => {
                                    const aFav = isFavorite(a.id);
                                    const bFav = isFavorite(b.id);
                                    if (aFav && !bFav) return -1;
                                    if (!aFav && bFav) return 1;
                                    return 0;
                                })
                                .map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            }
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                                <p className="text-slate-500 mb-4">No se encontraron productos que coincidan con su búsqueda.</p>
                                <button
                                    onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                                    className="text-primary font-bold hover:underline"
                                >
                                    Limpiar todos los filtros
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
