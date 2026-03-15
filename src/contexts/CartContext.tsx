"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type MenuItem = {
    id: string;
    name: string;
    description?: string;
    price: number;
    options?: string[];
};

export type CartItem = {
    item: MenuItem;
    quantity: number;
};

type CartContextType = {
    cart: { [key: string]: CartItem };
    addToCart: (item: MenuItem) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<{ [key: string]: CartItem }>({});

    const addToCart = (item: MenuItem) => {
        setCart((prev) => {
            const existing = prev[item.id];
            if (existing) {
                return { ...prev, [item.id]: { ...existing, quantity: existing.quantity + 1 } };
            }
            return { ...prev, [item.id]: { item, quantity: 1 } };
        });
    };

    const removeFromCart = (itemId: string) => {
        setCart((prev) => {
            const existing = prev[itemId];
            if (!existing) return prev;
            if (existing.quantity === 1) {
                const newCart = { ...prev };
                delete newCart[itemId];
                return newCart;
            }
            return { ...prev, [itemId]: { ...existing, quantity: existing.quantity - 1 } };
        });
    };

    const clearCart = () => setCart({});

    const cartTotal = Object.values(cart).reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);
    const cartCount = Object.values(cart).reduce((sum, { quantity }) => sum + quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
