import { useState, useEffect, useCallback } from 'react';
import { Blog } from '@/types';

const STORAGE_KEY = 'liwan_blog_favorites';
const EVENT_KEY = 'liwan-favorites-changed';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Blog[]>([]);
    const [showFavorites, setShowFavorites] = useState(false);

    const loadFavorites = useCallback(() => {
        if (typeof window === 'undefined') return;
        
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse favorites:', e);
                setFavorites([]);
            }
        } else {
            setFavorites([]);
        }
    }, []);

    useEffect(() => {
        loadFavorites();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                loadFavorites();
            }
        };

        const handleLocalChange = () => {
            loadFavorites();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener(EVENT_KEY, handleLocalChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener(EVENT_KEY, handleLocalChange);
        };
    }, [loadFavorites]);

    const toggleFavorite = (blog: Blog) => {
        const stored = localStorage.getItem(STORAGE_KEY);
        let currentFavorites: Blog[] = stored ? JSON.parse(stored) : [];
        
        // Ensure we're working with a valid array
        if (!Array.isArray(currentFavorites)) {
            currentFavorites = [];
        }
        
        const exists = currentFavorites.some(f => f.id === blog.id);
        
        if (exists) {
            currentFavorites = currentFavorites.filter(f => f.id !== blog.id);
        } else {
            currentFavorites.push(blog);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentFavorites));
        
        // Dispatch event to notify other components/hooks
        window.dispatchEvent(new Event(EVENT_KEY));
        
        // Update local state immediately
        setFavorites(currentFavorites);
    };

    const isFavorite = (blogId: number) => {
        return favorites.some((fav) => fav.id === blogId);
    };

    return {
        favorites,
        toggleFavorite,
        isFavorite,
        showFavorites,
        setShowFavorites
    };
}
