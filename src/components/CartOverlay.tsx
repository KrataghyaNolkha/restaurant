"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function CartOverlay({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void
}) {
    const { cart, addToCart, removeFromCart, cartTotal } = useCart();
    const cartItems = Object.values(cart);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-[#0A0A0C] border-l border-[#D4AF37]/20 z-[101] flex flex-col shadow-2xl"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0 bg-[#050505]">
                            <div className="flex items-center gap-3 text-[#D4AF37]">
                                <ShoppingBag size={24} />
                                <h2 className="font-serif text-2xl tracking-wide">Your Cart</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto w-full p-6 custom-scrollbar">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <ShoppingBag size={48} className="mb-4 text-white/20" />
                                    <p className="text-lg font-medium text-white mb-2">Your cart is empty</p>
                                    <p className="text-sm text-white/60">Discover the new architecture of flavor.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    {cartItems.map(({ item, quantity }) => (
                                        <div key={item.id} className="flex flex-col gap-3 group border-b border-white/5 pb-6 last:border-0">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 pr-4">
                                                    <h4 className="text-white text-base font-medium tracking-wide">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-[#D4AF37]/80 text-sm font-medium mt-1">
                                                        ${(item.price * quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between shrink-0">
                                                <div className="flex items-center gap-3 shrink-0 bg-white/5 rounded-full p-1 border border-white/10 mt-1 w-max">
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="p-1.5 hover:bg-white/10 rounded-full text-white transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-4 text-center text-white text-sm font-medium">
                                                        {quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => addToCart(item)}
                                                        className="p-1.5 hover:bg-white/10 rounded-full text-white transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-white/30 hover:text-[#8B0000] text-xs uppercase tracking-wider transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="p-6 bg-[#050505] border-t border-white/10 shrink-0">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-white/60 tracking-wider uppercase text-sm">Total</span>
                                    <span className="text-2xl font-serif text-[#D4AF37]">${cartTotal.toFixed(2)}</span>
                                </div>
                                <button className="w-full py-4 px-6 bg-gradient-to-r from-[#D4AF37] to-[#8B0000] text-black font-semibold rounded-lg text-sm uppercase tracking-widest hover:brightness-110 active:brightness-90 transition-all flex justify-between items-center">
                                    <span>Proceed to Payment</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
