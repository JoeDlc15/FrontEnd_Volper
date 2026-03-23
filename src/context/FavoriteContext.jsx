import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { getFavorites, toggleFavorite as apiToggleFavorite, syncFavorites as apiSyncFavorites } from '../services/api';

const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState(() => {
        const local = localStorage.getItem('localFavorites');
        return local ? JSON.parse(local) : [];
    });
    const prevUserRef = useRef(null);

    // Persistir en localStorage siempre que cambien los favoritos
    useEffect(() => {
        localStorage.setItem('localFavorites', JSON.stringify(favorites));
    }, [favorites]);

    // Lógica de sincronización al iniciar sesión
    useEffect(() => {
        const handleAuthChange = async () => {
            // Login detectado (de null/invitado a usuario con id)
            if (user && !prevUserRef.current) {
                const localFavs = JSON.parse(localStorage.getItem('localFavorites') || '[]');
                if (localFavs.length > 0) {
                    // Sincronizar locales con el servidor
                    const synced = await apiSyncFavorites(localFavs);
                    setFavorites(synced);
                } else {
                    // Cargar los del servidor si no hay locales
                    const serverFavs = await getFavorites();
                    setFavorites(serverFavs);
                }
            }
            // Logout detectado (de usuario a null)
            else if (!user && prevUserRef.current) {
                // Opcional: ¿Limpiar favoritos al cerrar sesión? 
                // El usuario pidió que si se loguea desde otro dispositivo cargue los suyos.
                // Al cerrar sesión, mantenemos los "actuales" como locales para el siguiente uso.
            }
            prevUserRef.current = user;
        };

        handleAuthChange();
    }, [user]);

    const isFavorite = (productId) => favorites.includes(productId);

    const toggleFavorite = async (productId) => {
        const pId = parseInt(productId);
        let newFavorites;

        if (favorites.includes(pId)) {
            newFavorites = favorites.filter(id => id !== pId);
        } else {
            newFavorites = [...favorites, pId];
        }

        setFavorites(newFavorites);

        if (user) {
            await apiToggleFavorite(pId);
        }
    };

    return (
        <FavoriteContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};
