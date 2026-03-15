import ScrollytellingCanvas from "@/components/ScrollytellingCanvas";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-[#D4AF37] selection:text-[#050505]">
      {/* 
        The Navigation is already in layout.tsx, but if we need a specific one for the home page 
        or just to ensure it's there. In this setup, we rely on layout.tsx for Navigation.
      */}

      {/* 
        This ScrollytellingCanvas component is 600vh tall and controls the entire
        visual journey of the landing page.
      */}
      <ScrollytellingCanvas />

      {/* Footer Section - A short buffer after the dramatic reassembly */}
      <footer className="relative z-50 bg-[#0A0A0C] border-t border-white/5 py-24">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div>
            <span className="text-3xl font-serif tracking-widest text-[#D4AF37] block mb-4">
              THE ZENITH
            </span>
            <p className="text-white/50 text-sm max-w-sm">
              An uncompromising pursuit of flavor. Experience the architecture of a true culinary masterpiece.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="text-white tracking-widest text-xs uppercase font-medium">Experience</h4>
              <a href="#" className="text-sm text-white/50 hover:text-[#D4AF37] transition-colors">Locations</a>
              <a href="#" className="text-sm text-white/50 hover:text-[#D4AF37] transition-colors">Reservations</a>
              <a href="#" className="text-sm text-white/50 hover:text-[#D4AF37] transition-colors">Private Dining</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white tracking-widest text-xs uppercase font-medium">The Brand</h4>
              <a href="#" className="text-sm text-white/50 hover:text-[#D4AF37] transition-colors">Heritage</a>
              <a href="#" className="text-sm text-white/50 hover:text-[#D4AF37] transition-colors">Sourcing</a>
              <a href="#" className="text-sm text-white/50 hover:text-[#D4AF37] transition-colors">Press</a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs tracking-widest text-white/30 uppercase">
            © {new Date().getFullYear()} The Zenith. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white transition-colors uppercase tracking-widest">Instagram</a>
            <a href="#" className="text-xs text-white/30 hover:text-white transition-colors uppercase tracking-widest">Twitter</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
