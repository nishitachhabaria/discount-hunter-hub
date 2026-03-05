import { Tag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: "Deals", href: "#deals" },
    { label: "Price History", href: "#price-history" },
    { label: "Coupons", href: "#coupons" },
    { label: "Cart Optimizer", href: "#cart-optimizer" },
    { label: "Sales", href: "#sales" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-secondary/95 backdrop-blur-xl shadow-lg border-b border-border/20" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2.5 group"
        >
          <div className="p-1.5 rounded-lg bg-gradient-cta group-hover:shadow-md transition-shadow">
            <Tag className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-secondary-foreground font-display">DealDock</span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              className="px-4 py-2 text-sm text-secondary-foreground/60 hover:text-primary rounded-lg hover:bg-primary/10 transition-all font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>
        <button className="md:hidden text-secondary-foreground p-2 rounded-lg hover:bg-primary/10 transition-colors" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-secondary/95 backdrop-blur-xl border-t border-border/20 px-6 py-4 flex flex-col gap-1">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              className="px-4 py-3 text-sm text-secondary-foreground/70 hover:text-primary hover:bg-primary/10 rounded-lg transition-all font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
