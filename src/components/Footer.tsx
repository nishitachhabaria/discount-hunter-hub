import { Tag } from "lucide-react";

const Footer = () => (
  <footer className="bg-secondary py-12 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-gradient-cta">
          <Tag className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-secondary-foreground font-display">DealDock</span>
      </div>
      <p className="text-sm text-secondary-foreground/50">
        Built by Team DealDock — CVMU Hackathon 4.0, 2026
      </p>
      <p className="text-xs text-secondary-foreground/30">Saves time. Protects from scams. Optimizes spending.</p>
    </div>
  </footer>
);

export default Footer;
