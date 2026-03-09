import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Cart parsing error:", e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const addToCart = (productVariant) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.sku === productVariant.sku);
            if (existing) {
                return prev.map((item) =>
                    item.sku === productVariant.sku ? { ...item, quantity: item.quantity + productVariant.quantity } : item
                );
            }
            return [...prev, productVariant];
        });
        openDrawer(); // Auto-open when adding
    };

    const removeFromCart = (sku) => {
        setCart((prev) => prev.filter((item) => item.sku !== sku));
    };

    const updateQuantity = (sku, quantity) => {
        setCart((prev) =>
            prev.map((item) =>
                item.sku === sku ? { ...item, quantity: Math.max(0, quantity) } : item
            ).filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.length;

    return (
        <CartContext.Provider value={{
            cart: cart || [],
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal: cartTotal || 0,
            cartCount: cartCount || 0,
            isDrawerOpen,
            openDrawer,
            closeDrawer
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
