import { motion } from "framer-motion";
import { NOXN } from "@/constants/testIds";

const HERO_BG = "https://static.prod-images.emergentagent.com/jobs/7a9b6db3-da51-486d-b381-a72900b8fc1d/images/c371a76cb25fe848c920302f5418d709b49227e19714e164af48f76fb7e33779.png";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

export const Hero = ({ onBegin }) => {
    return (
        <section
            id="top"
            data-testid={NOXN.heroSection}
            className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-24"
        >
            {/* Background image with overlays */}
            <div className="absolute inset-0 -z-10">
                <img
                    src={HERO_BG}
                    alt="Futuristic digital billboard"
                    className="w-full h-full object-cover opacity-70"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050B14]/40 via-[#050B14]/70 to-[#050B14]" />
                <div className="absolute inset-0 grid-noise opacity-40" />
                <div className="absolute inset-0 scanlines opacity-30 mix-blend-overlay" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full">
                {/* Ticker / metadata strip */}
                <motion.div
                    {...fadeUp(0)}
                    className="font-mono-tech text-[11px] uppercase tracking-[0.35em] text-slate-400 flex items-center gap-3 mb-10"
                >
                    <span className="inline-block w-1.5 h-1.5 bg-[#FF5A00] animate-glow-pulse" />
                    NOXN / Out-of-home, redefined · v.2026
                </motion.div>

                <motion.h1
                    {...fadeUp(0.08)}
                    className="font-display font-black tracking-tighter text-white text-5xl sm:text-6xl lg:text-[6rem] leading-[0.92]"
                >
                    Your message,<br />
                    <span className="text-[#FF5A00] text-glow-orange">towering</span> over the city.
                </motion.h1>

                <motion.p
                    {...fadeUp(0.2)}
                    data-testid={NOXN.heroSubcopy}
                    className="mt-10 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed"
                >
                    NOXN is a digital billboard studio for founders, small businesses and product launches.
                    We design the ad. We secure the screen. You light up the skyline.
                </motion.p>

                <motion.div {...fadeUp(0.32)} className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <button
                        onClick={onBegin}
                        data-testid={NOXN.heroCtaPrimary}
                        className="group relative inline-flex items-center gap-3 bg-[#FF5A00] hover:bg-[#E65200] text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 border-glow-orange"
                    >
                        Let's begin
                        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </button>

                    <a
                        href="#services"
                        data-testid={NOXN.heroCtaSecondary}
                        className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white border border-white/15 hover:border-white/40 hover:bg-white/5 transition-all"
                    >
                        Explore services
                    </a>
                </motion.div>

                {/* Stats bar */}
                <motion.div
                    {...fadeUp(0.5)}
                    className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 border border-white/5"
                >
                    {[
                        { k: "12s", v: "Avg. spot length" },
                        { k: "180+", v: "Screens networked" },
                        { k: "48h", v: "Creative turnaround" },
                        { k: "1.2M", v: "Daily impressions" },
                    ].map((s) => (
                        <div key={s.v} className="bg-[#050B14] p-6">
                            <div className="font-display font-black text-3xl text-white tracking-tighter">{s.k}</div>
                            <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-slate-500 font-mono-tech">
                                {s.v}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Vertical edge label */}
            <div className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-center font-mono-tech text-[10px] uppercase tracking-[0.5em] text-slate-500">
                Scroll · 01 / 06
            </div>
        </section>
    );
};
