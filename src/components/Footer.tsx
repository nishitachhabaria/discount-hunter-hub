import { Tag, Heart, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const links = [
    { label: "Deals", href: "#deals" },
    { label: "Price History", href: "#price-history" },
    { label: "Coupons", href: "#coupons" },
    { label: "Cart Optimizer", href: "#cart-optimizer" },
    { label: "Sales", href: "#sales" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="bg-secondary py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 rounded-lg bg-gradient-cta">
                <Tag className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-secondary-foreground font-display">DealDock</span>
            </div>
            <p className="text-sm text-secondary-foreground/50 leading-relaxed max-w-xs">
              Your smart shopping companion. Compare prices, detect fake discounts, and never overpay again.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4 font-display">Quick Links</h4>
            <ul className="space-y-2.5">
              {links.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => handleClick(e, l.href)}
                    className="text-sm text-secondary-foreground/50 hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4 font-display">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Mail, href: "mailto:hello@dealdock.com", label: "Email" },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-secondary-foreground/5 text-secondary-foreground/40 hover:text-primary hover:bg-primary/10 transition-all"
                  aria-label={s.label}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-secondary-foreground/30 mt-4">
              hello@dealdock.com
            </p>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary-foreground/30">
            © {new Date().getFullYear()} DealDock. All rights reserved.
          </p>
          <p className="text-xs text-secondary-foreground/30 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-destructive fill-current" /> for smart shoppers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
