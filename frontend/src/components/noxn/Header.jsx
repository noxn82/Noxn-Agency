import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NOXN } from "@/constants/testIds";

const links = [
    { label: "Services", href: "#services", id: NOXN.headerNavServices },
    { label: "Process", href: "#process", id: NOXN.headerNavProcess },
    { label: "Pricing", href: "#pricing", id: NOXN.headerNavPricing },
    { label: "FAQ", href: "#faq", id: NOXN.headerNavFaq },
];

export const Header = ({ onBegin }) => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.header
            data-testid={NOXN.header}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
                scrolled ? "glass border-b border-white/5" : "bg-transparent"
            }`}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
                <a
                    href="#top"
                    data-testid={NOXN.headerLogo}
                    className="font-display font-black text-2xl tracking-tighter text-white flex items-center gap-2"
                >
                    <span className="inline-block w-2 h-2 bg-[#FF5A00] animate-glow-pulse" />
                    NOXN
                </a>

                <nav className="hidden md:flex items-center gap-10">
                    {links.map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            data-testid={l.id}
                            className="text-sm text-slate-300 hover:text-white transition-colors font-mono-tech uppercase tracking-widest"
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onBegin}
                        data-testid={NOXN.headerCta}
                        className="hidden md:inline-flex items-center gap-2 bg-[#FF5A00] hover:bg-[#E65200] text-white px-5 py-2.5 text-sm font-semibold transition-colors uppercase tracking-wider"
                    >
                        Let's begin
                        <span aria-hidden>→</span>
                    </button>

                    <button
                        className="md:hidden text-white"
                        onClick={() => setOpen((o) => !o)}
                        data-testid="mobile-menu-toggle"
                        aria-label="Toggle menu"
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden glass border-t border-white/5">
                    <div className="px-6 py-6 flex flex-col gap-4">
                        {links.map((l) => (
                            <a
                                key={l.label}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="text-base text-slate-200 font-mono-tech uppercase tracking-widest"
                            >
                                {l.label}
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                setOpen(false);
                                onBegin();
                            }}
                            className="mt-2 bg-[#FF5A00] hover:bg-[#E65200] text-white px-5 py-3 text-sm font-semibold uppercase tracking-wider"
                            data-testid="mobile-cta-begin"
                        >
                            Let's begin
                        </button>
                    </div>
                </div>
            )}
        </motion.header>
    );
};
