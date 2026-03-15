"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MenuOverlay from "@/components/MenuOverlay";
import CartOverlay from "@/components/CartOverlay";
import { useCart } from "@/contexts/CartContext";

export default function Navigation() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartCount } = useCart();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }

        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo/Brand */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-xl md:text-2xl font-serif tracking-widest text-white/90 group-hover:text-white transition-colors">
                        THE ZENITH
                    </span>
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {["The Anatomy", "Locations"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(" ", "-")}`}
                            className="text-sm tracking-wide text-white/60 hover:text-white transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="text-sm tracking-wide text-white/60 hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                        Menu
                    </button>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="text-sm tracking-wide text-white/60 hover:text-[#D4AF37] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                        Cart {cartCount > 0 && <span className="text-[#D4AF37] text-xs px-1.5 py-0.5 bg-[#D4AF37]/10 rounded-full">{cartCount}</span>}
                    </button>
                </nav>

                {/* CTA Button */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            const convaiElements = document.getElementsByTagName("elevenlabs-convai");
                            if (convaiElements.length > 0) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const convaiEl = convaiElements[0] as any;
                                // Attempt programmatic API calls, or fallback to clicking inside shadow DOM
                                if (typeof convaiEl.open === "function") convaiEl.open();
                                else if (typeof convaiEl.toggle === "function") convaiEl.toggle();
                                else if (typeof convaiEl.expand === "function") convaiEl.expand();
                                else {
                                    const shadowBtn = convaiEl.shadowRoot?.querySelector("button");
                                    if (shadowBtn) shadowBtn.click();
                                    else convaiEl.click();
                                }
                            }
                        }}
                        className="hidden sm:flex px-6 py-2.5 rounded-full text-sm font-medium transition-all
                     bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 
                     hover:border-[#D4AF37] hover:from-[#D4AF37]/20 text-[#D4AF37] 
                     shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer"
                    >
                        Order Priority Delivery
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="md:hidden p-2 text-white/60 hover:text-white cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                    </button>
                </div>
            </div>

            <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </motion.header>
    );
}
