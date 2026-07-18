import { Github, Linkedin, Facebook, Instagram, Mail } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { icon: Github, href: "https://github.com/maazyounas", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/muhammad-maaz-younas-b760503a8/",
    label: "LinkedIn",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/maazyounas77",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/_maazyounas_",
    label: "Instagram",
  },
  {
  icon: Mail,
  href: "mailto:maazyounas06@gmail.com?subject=Let's Work Together&body=Hi Maaz, I saw your portfolio...",
  label: "Email",
}
];

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const Footer = () => {
  return (
    <footer className="relative mt-0 bg-gradient-to-b from-background to-background/95 backdrop-blur-xl">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16 lg:py-6 relative ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="text-metallic-animated text-2xl font-bold mb-4">
              Maaz Younas
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Crafting digital experiences with passion and precision. Let's
              build something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-6 text-foreground">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {links.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links Section */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-6 text-foreground">
              Let's Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary border border-border/50 text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 icon-glow"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-5 border-t border-border/30">
            <div className="relative flex items-center justify-center gap-4 py-4">
              {/* Copyright - Absolutely centered */}
              <p className="text-muted-foreground text-sm text-center">
                © {new Date().getFullYear()}{" "}
                <span className="text-primary font-bold">Maaz Younas</span> All
                rights reserved
              </p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
