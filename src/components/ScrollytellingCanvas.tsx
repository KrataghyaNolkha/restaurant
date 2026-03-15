"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const TOTAL_FRAMES = 240;

export default function ScrollytellingCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the scroll progress slightly for the image sequence
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // PRELOAD IMAGES
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                // ezgif-frame-001.jpg format
                const paddedIndex = i.toString().padStart(3, "0");
                img.src = `/frames/ezgif-frame-${paddedIndex}.jpg`;

                await new Promise((resolve) => {
                    img.onload = () => {
                        loadedCount++;
                        setImagesLoaded(loadedCount);
                        resolve(null);
                    };
                    // Just skip silently if an image is missing
                    img.onerror = () => resolve(null);
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
        };

        loadImages();
    }, []);

    // DRAW CANVAS based on scroll
    useEffect(() => {
        if (images.length === 0 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        // Handle resizing
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(0); // Render first frame on resize
        };

        const renderFrame = (progress: number) => {
            const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.floor(progress * TOTAL_FRAMES)
            );

            const img = images[frameIndex];
            // Sometimes an image might have failed to load
            if (!img || !img.complete || img.naturalHeight === 0) return;

            // Calculate preserving aspect ratio (cover style)
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        // Subscribe to scroll changes
        const unsubscribe = smoothProgress.on("change", renderFrame);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            unsubscribe();
        };
    }, [images, smoothProgress]);

    // SCROLL-LINKED STORYTELLING NODES

    // Node 1: 0-15% (The Icon)
    const op1 = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.15], [1, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

    // Node 2: 15-40% (The Deconstruction)
    const op2 = useTransform(scrollYProgress, [0.15, 0.20, 0.35, 0.40], [0, 1, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.15, 0.20], [-50, 0]);

    // Node 3: 40-65% (The Detail)
    const op3 = useTransform(scrollYProgress, [0.40, 0.45, 0.60, 0.65], [0, 1, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.40, 0.45], [50, 0]);

    // Node 4: 65-85% (The Texture)
    const op4 = useTransform(scrollYProgress, [0.65, 0.70, 0.80, 0.85], [0, 1, 1, 0]);
    const y4 = useTransform(scrollYProgress, [0.65, 0.70], [50, 0]);

    // Node 5: 85-100% (The Reassembly/Show)
    const op5 = useTransform(scrollYProgress, [0.85, 0.90, 1, 1], [0, 1, 1, 1]);
    const y5 = useTransform(scrollYProgress, [0.85, 0.90], [50, 0]);

    return (
        <div ref={containerRef} className="relative h-[600vh] bg-transparent">

            {/* Loading Overlay */}
            {imagesLoaded < TOTAL_FRAMES && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-[#D4AF37]">
                    <h2 className="font-serif text-2xl mb-4 tracking-widest">PREPARING INGREDIENTS</h2>
                    <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#8B0000] transition-all duration-300"
                            style={{ width: `${(imagesLoaded / TOTAL_FRAMES) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505]">

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                />

                {/* Shadow overlays to ensure text legibility depending on the frame's lighting */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505]/60 z-10 pointer-events-none mix-blend-multiply" />

                {/* Storytelling Content Layers */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-6 h-full pointer-events-none flex flex-col justify-center">

                    {/* Node 1: The Icon (0-15%) */}
                    <motion.div
                        style={{ opacity: op1, y: y1 }}
                        className="absolute inset-0 flex flex-col items-center justify-end md:justify-center pb-32 md:pb-0 text-center"
                    >
                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight text-white mb-6 drop-shadow-2xl">
                            The Zenith
                        </h1>
                        <p className="font-sans text-xl md:text-2xl text-white/80 tracking-widest uppercase mb-12">
                            The New Architecture of Flavor.
                        </p>
                        <div className="w-[1px] h-24 bg-gradient-to-b from-[#D4AF37] to-transparent" />
                    </motion.div>

                    {/* Node 2: The Deconstruction (15-40%) */}
                    <motion.div
                        style={{ opacity: op2, x: x2 }}
                        className="absolute left-6 md:left-12 lg:left-24 top-1/2 -translate-y-1/2 max-w-md"
                    >
                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
                            Precision-<br />Sourced.
                        </h2>
                        <div className="h-[1px] w-12 bg-[#D4AF37] mb-6" />
                        <p className="font-sans text-lg text-white/70 leading-relaxed">
                            45-day dry-aged wagyu beef, traceable to single-source heritage farms.
                            The foundation of a culinary masterpiece requires uncompromising integrity at every layer.
                        </p>
                    </motion.div>

                    {/* Node 3: The Detail (40-65%) */}
                    <motion.div
                        style={{ opacity: op3, x: x3 }}
                        className="absolute right-6 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 max-w-md text-right flex flex-col items-end"
                    >
                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
                            The Science<br />of Umami.
                        </h2>
                        <div className="h-[1px] w-12 bg-[#8B0000] mb-6" />
                        <p className="font-sans text-lg text-white/70 leading-relaxed">
                            Calculated flavor layering. Optimal heat-conduction during the Maillard reaction.
                            Glistening droplets of our signature Zenith Sauce bonding with the molecular structure of melted aged cheddar.
                        </p>
                    </motion.div>

                    {/* Node 4: The Texture (65-85%) */}
                    <motion.div
                        style={{ opacity: op4, y: y4 }}
                        className="absolute inset-0 flex flex-col items-center justify-end pb-48 text-center"
                    >
                        <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
                            Texture in Harmony.
                        </h2>
                        <p className="font-sans text-xl text-white/80 max-w-2xl mx-auto">
                            The precise calibration between the acoustic <span className="text-[#D4AF37] italic">&quot;crunch&quot;</span> of artisanal bacon
                            and the <span className="text-white font-light">&quot;cloud-like&quot;</span> buoyancy of a toasted brioche crown.
                        </p>
                    </motion.div>

                    {/* Node 5: The Reassembly (85-100%) */}
                    <motion.div
                        style={{ opacity: op5, y: y5 }}
                        className="absolute inset-x-0 bottom-24 flex flex-col items-center text-center pointer-events-auto"
                    >
                        <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white mb-4 tracking-tighter drop-shadow-2xl">
                            One Bite.<br className="md:hidden" /> Total Silence.
                        </h2>
                        <p className="font-sans text-lg md:text-xl text-white/60 tracking-widest uppercase mb-12">
                            The Zenith. Crafted for the Obsessed.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <button className="px-10 py-4 bg-[#D4AF37] text-[#050505] font-semibold tracking-wider text-sm uppercase transition-transform hover:scale-105 hover:bg-white">
                                Order Now
                            </button>
                            <button className="px-10 py-4 border border-white/20 text-white font-medium tracking-wider text-sm uppercase transition-all hover:bg-white/5 hover:border-white/50">
                                View the Full Collection
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
