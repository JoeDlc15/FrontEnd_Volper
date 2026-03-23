import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoriteContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { isFavorite, toggleFavorite } = useFavorites();
    const titleRef = useRef(null);
    const [isLongTitle, setIsLongTitle] = useState(false);

    useEffect(() => {
        const checkTitleLength = () => {
            if (titleRef.current) {
                // getClientRects() devuelve un rect por cada línea de texto.
                // Es mucho más fiable que medir la altura en píxeles.
                const lineCount = titleRef.current.getClientRects().length;
                setIsLongTitle(lineCount > 1);
            }
        };

        // Delay para asegurar que el renderizado y wrap del texto se haya completado
        const timer = setTimeout(checkTitleLength, 200);
        window.addEventListener('resize', checkTitleLength);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkTitleLength);
        };
    }, [product.name]);

    return (
        <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 flex flex-col h-full mx-auto w-full md:max-w-xs" style={{ fontFamily: "'Barlow', sans-serif" }}>
            <Link to={`/producto/${product.id}`} className="block relative group-image">
                <div className="h-40 md:h-48 bg-slate-100 dark:bg-slate-800/80 p-4 md:p-5 flex items-center justify-center relative overflow-hidden border-b border-transparent dark:border-slate-700">
                    <div className="absolute top-2 left-2 z-30 md:hidden">
                        <span className="bg-primary/80 text-white px-2 py-1 md:px-3 text-[8.5px] md:text-[9.5px] uppercase tracking-widest rounded-full shadow-sm whitespace-nowrap">
                            {product.category}
                        </span>
                    </div>

                    <img
                        alt={product.name}
                        className="h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-sm"
                        src={product.image}
                    />
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>

                    {/* Hover Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 z-20">
                        <div className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-lg text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                            <Eye size={18} />
                        </div>
                        <button
                            className={`p-2 bg-white dark:bg-slate-900 rounded-full shadow-lg transition-colors ${isFavorite(product.id) ? 'text-yellow-500' : 'text-slate-600 dark:text-slate-300 hover:text-primary'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(product.id);
                            }}
                        >
                            <Star size={18} fill={isFavorite(product.id) ? "currentColor" : "none"} />
                        </button>
                    </div>
                </div>
            </Link>

            <div className="p-3 md:p-4 flex flex-col flex-grow">
                {/* Categoría (Solo PC) */}
                <div className="hidden md:block text-slate-400 dark:text-slate-500 text-[10px] md:text-[11px] font-semibold mb-1 tracking-widest uppercase">
                    {product.category}
                </div>

                <Link to={`/producto/${product.id}`} className="mb-4 block flex items-center">
                    <h3
                        ref={titleRef}
                        className="text-[14px] md:text-[18px] font-black text-slate-900 dark:text-white transition-colors line-clamp-2 leading-tight group-hover:text-primary"
                        title={product.name}
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        {product.name}
                    </h3>
                </Link>


                <div className="mt-auto">
                    <Link
                        to={`/producto/${product.id}`}
                        className="w-full border-2 border-primary py-2 md:py-3 block text-center rounded-lg md:rounded-xl text-primary font-bold group-hover:bg-primary group-hover:text-white transition-all font-display uppercase tracking-wider text-[11px] md:text-[13px]"
                    >
                        Ver Medidas
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
