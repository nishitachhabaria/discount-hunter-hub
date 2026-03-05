import { Tag, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const links = ["Deals", "Price History", "Coupons", "Cart Optimizer", "Sales"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/90 backdrop-blur-xl border-b border-border/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-cta">
            <Tag className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-secondary-foreground font-display">DealDock</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
              {l}
            </a>
          ))}
        </div>
        <button className="md:hidden text-secondary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-secondary border-t border-border/20 px-6 py-4 flex flex-col gap-3">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-secondary-foreground/70 hover:text-primary" onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
