import { NOXN } from "@/constants/testIds";

export const Footer = ({ onBegin }) => {
    return (
        <footer
            id="contact"
            data-testid={NOXN.footer}
            className="relative border-t border-white/5 pt-24 pb-12 overflow-hidden"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
                    <div className="lg:col-span-7">
                        <div className="font-mono-tech text-[11px] uppercase tracking-[0.35em] text-[#FF5A00] mb-6 flex items-center gap-3">
                            <span className="inline-block w-6 h-px bg-[#FF5A00]" />
                            06 / Ready when you are
                        </div>
                        <h3 className="font-display font-black tracking-tighter text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
                            Let's start prepping<br />
                            <span className="text-[#FF5A00] text-glow-orange">your campaign.</span>
                        </h3>
                        <p className="mt-8 text-slate-400 max-w-md text-base">
                            The assessment takes about 4 minutes. You'll hear back from a campaign director
                            with a tailored plan inside one business day.
                        </p>
                        <button
                            onClick={onBegin}
                            data-testid="footer-cta-begin"
                            className="mt-10 inline-flex items-center gap-3 bg-[#FF5A00] hover:bg-[#E65200] text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 border-glow-orange"
                        >
                            Put me on a billboard
                            <span aria-hidden>→</span>
                        </button>
                    </div>

                    <div className="lg:col-span-5 grid grid-cols-2 gap-8">
                        <div>
                            <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-4">
                                / Sitemap
                            </div>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li><a href="#services" className="hover:text-[#FF5A00] transition-colors">Services</a></li>
                                <li><a href="#process" className="hover:text-[#FF5A00] transition-colors">Process</a></li>
                                <li><a href="#pricing" className="hover:text-[#FF5A00] transition-colors">Pricing</a></li>
                                <li><a href="#faq" className="hover:text-[#FF5A00] transition-colors">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-4">
                                / Contact
                            </div>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>
                                    <a href="mailto:noxn@noxn.com.au" className="hover:text-[#FF5A00] transition-colors" data-testid="footer-email">
                                        noxn@noxn.com.au
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+61415100275" className="hover:text-[#FF5A00] transition-colors" data-testid="footer-phone">
                                        0415 100 275
                                    </a>
                                </li>
                                <li data-testid="footer-location">Brisbane, Queensland</li>
                                <li data-testid="footer-address">39 Boundary St, South Brisbane QLD 4101</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Massive logo */}
                <div className="relative w-full overflow-hidden">
                    <div className="font-display font-black tracking-tighter text-white/[0.04] leading-none select-none pointer-events-none" style={{ fontSize: "clamp(6rem, 22vw, 22rem)" }}>
                        NOXN
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-slate-500">
                        © {new Date().getFullYear()} NOXN · Out-of-home, redefined
                    </div>
                    <div className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 bg-[#FF5A00] animate-glow-pulse" />
                        Network status · operational
                    </div>
                </div>
            </div>
        </footer>
    );
};
