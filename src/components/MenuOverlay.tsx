"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

type MenuItem = {
    id: string;
    name: string;
    description?: string;
    price: number;
    options?: string[];
};

type MenuCategory = {
    category: string;
    items: MenuItem[];
};

const MENU_DATA: MenuCategory[] = [
    {
        category: "Appetizers",
        items: [
            { id: "a1", name: "Spring Rolls (4 pieces)", description: "Crispy vegetable spring rolls served with sweet chili sauce", price: 8.95 },
            { id: "a2", name: "Curry Puffs (4 pieces)", description: "Golden pastry filled with curried potatoes, onions, and peas", price: 9.95 },
            { id: "a3", name: "Satay Chicken (5 skewers)", description: "Grilled marinated chicken skewers with peanut sauce and cucumber relish", price: 11.95 },
            { id: "a4", name: "Tod Mun Pla (Fish Cakes, 5 pieces)", description: "Thai-style fish cakes served with sweet chili sauce and crushed peanuts", price: 12.95 },
            { id: "a5", name: "Tom Yum Soup", description: "Hot and sour soup with mushrooms, lemongrass, galangal. Choice: Chicken, Prawns(+$2), Veg", price: 12.95 },
            { id: "a6", name: "Tom Kha Soup", description: "Coconut milk soup with galangal and lime leaves. Choice: Chicken, Prawns(+$2), Veg", price: 12.95 }
        ]
    },
    {
        category: "Salads",
        items: [
            { id: "s1", name: "Som Tam (Green Papaya Salad)", description: "Shredded green papaya, tomatoes, green beans, peanuts in lime dressing", price: 10.95 },
            { id: "s2", name: "Larb Gai (Chicken Salad)", description: "Minced chicken with herbs, toasted rice powder, and lime juice", price: 13.95 },
            { id: "s3", name: "Yum Woon Sen (Glass Noodle Salad)", description: "Glass noodles with prawns, ground chicken, and fresh vegetables", price: 14.95 }
        ]
    },
    {
        category: "Stir-Fries",
        items: [
            { id: "sf1", name: "Pad Thai", description: "Classic Thai rice noodles with egg, bean sprouts, and crushed peanuts", price: 15.95 },
            { id: "sf2", name: "Pad See Ew", description: "Flat rice noodles stir-fried with egg and Chinese broccoli in sweet soy sauce", price: 15.95 },
            { id: "sf3", name: "Pad Krapow (Holy Basil)", description: "Stir-fried with holy basil, chili, and garlic", price: 15.95 },
            { id: "sf4", name: "Pad Cashew Nut", description: "Stir-fried with cashews, onions, bell peppers, and dried chili", price: 16.95 },
            { id: "sf5", name: "Pad Prik King", description: "Stir-fried with red curry paste and green beans", price: 15.95 }
        ]
    },
    {
        category: "Curries",
        items: [
            { id: "c1", name: "Red Curry", description: "Bamboo shoots, bell peppers, and basil in coconut red curry", price: 16.95 },
            { id: "c2", name: "Green Curry", description: "Eggplant, bamboo shoots, and basil in coconut green curry", price: 16.95 },
            { id: "c3", name: "Yellow Curry", description: "Potatoes, onions, and carrots in coconut yellow curry", price: 16.95 },
            { id: "c4", name: "Massaman Curry", description: "Potatoes, onions, peanuts, and tamarind in rich Massaman curry", price: 17.95 },
            { id: "c5", name: "Panang Curry", description: "Bell peppers and kaffir lime leaves in thick Panang curry", price: 16.95 }
        ]
    },
    {
        category: "Chef's Specialties",
        items: [
            { id: "cs1", name: "Crying Tiger", description: "Grilled marinated beef sirloin with spicy tamarind dipping sauce", price: 24.95 },
            { id: "cs2", name: "Pla Rad Prik (Crispy Fish)", description: "Whole crispy fish topped with sweet and spicy chili sauce", price: 26.95 },
            { id: "cs3", name: "Duck Tamarind", description: "Crispy roasted duck with tamarind sauce and steamed vegetables", price: 25.95 },
            { id: "cs4", name: "Seafood Paradise", description: "Prawns, squid, mussels, and fish stir-fried in chili basil sauce", price: 28.95 },
            { id: "cs5", name: "Thai Fusion Special Fried Rice", description: "Fried rice with prawns, chicken, egg, pineapple, cashews, and raisins", price: 18.95 }
        ]
    },
    {
        category: "Rice & Noodles",
        items: [
            { id: "rn1", name: "Jasmine Rice", price: 3.00 },
            { id: "rn2", name: "Coconut Rice", price: 4.50 },
            { id: "rn3", name: "Brown Rice", price: 3.50 },
            { id: "rn4", name: "Sticky Rice", price: 4.00 },
            { id: "rn5", name: "Steamed Noodles", price: 4.00 }
        ]
    },
    {
        category: "Desserts",
        items: [
            { id: "d1", name: "Mango Sticky Rice", description: "Sweet sticky rice with fresh mango and coconut cream", price: 8.95 },
            { id: "d2", name: "Fried Banana with Ice Cream", description: "Crispy fried banana served with vanilla ice cream", price: 7.95 },
            { id: "d3", name: "Coconut Ice Cream", description: "Homemade coconut ice cream with peanuts", price: 6.95 },
            { id: "d4", name: "Thai Custard", description: "Traditional Thai custard with sweet coconut cream", price: 6.95 }
        ]
    },
    {
        category: "Beverages",
        items: [
            { id: "b1", name: "Thai Iced Tea", price: 4.95 },
            { id: "b2", name: "Thai Iced Coffee", price: 4.95 },
            { id: "b3", name: "Coconut Water", price: 4.50 },
            { id: "b4", name: "Soft Drinks", price: 2.95 },
            { id: "b5", name: "Sparkling Water", price: 3.95 },
            { id: "b6", name: "Hot Jasmine Tea", price: 3.50 }
        ]
    }
];

export default function MenuOverlay({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void
}) {
    const { cart, addToCart, removeFromCart } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Menu Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] bg-[#0A0A0C] border-l border-[#D4AF37]/20 z-[101] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0 bg-[#050505]">
                            <h2 className="font-serif text-3xl text-white tracking-wide">The Collection</h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Menu Content */}
                        <div className="flex-1 overflow-y-auto w-full p-6 pb-32 custom-scrollbar">
                            {MENU_DATA.map((category) => (
                                <div key={category.category} className="mb-12">
                                    <h3 className="font-serif text-2xl text-[#D4AF37] mb-6 border-b border-[#D4AF37]/20 pb-2">
                                        {category.category}
                                    </h3>
                                    <div className="flex flex-col gap-6">
                                        {category.items.map((item) => {
                                            const cartItem = cart[item.id];
                                            return (
                                                <div key={item.id} className="flex justify-between items-start group">
                                                    <div className="flex-1 pr-6">
                                                        <h4 className="text-white text-lg font-medium tracking-wide group-hover:text-[#D4AF37] transition-colors duration-300">
                                                            {item.name}
                                                        </h4>
                                                        {item.description && (
                                                            <p className="text-white/50 text-sm mt-1 leading-relaxed">
                                                                {item.description}
                                                            </p>
                                                        )}
                                                        <p className="text-[#D4AF37]/80 text-sm font-medium mt-2">
                                                            ${item.price.toFixed(2)}
                                                        </p>
                                                    </div>

                                                    {/* Add/Remove Controls */}
                                                    <div className="flex items-center gap-3 shrink-0 bg-white/5 rounded-full p-1 border border-white/10 mt-1">
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            disabled={!cartItem}
                                                            className={cn(
                                                                "p-1.5 rounded-full transition-colors",
                                                                cartItem ? "hover:bg-white/10 text-white" : "text-white/20 cursor-not-allowed"
                                                            )}
                                                        >
                                                            <Minus size={16} />
                                                        </button>
                                                        <span className="w-4 text-center text-white text-sm font-medium">
                                                            {cartItem?.quantity || 0}
                                                        </span>
                                                        <button
                                                            onClick={() => addToCart(item)}
                                                            className="p-1.5 rounded-full hover:bg-[#D4AF37] hover:text-black text-white transition-colors"
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
