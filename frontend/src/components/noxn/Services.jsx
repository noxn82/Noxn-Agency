import { motion } from "framer-motion";
import { NOXN } from "@/constants/testIds";
import { Sparkles, MapPin, ArrowUpRight } from "lucide-react";

const LED_IMG = "https://static.prod-images.emergentagent.com/jobs/7a9b6db3-da51-486d-b381-a72900b8fc1d/images/19ea8d617b2e136a2c645cfe754236ae11eb7d5869067c113834236e2308726f.png";
const CITY_IMG = "https://images.unsplash.com/photo-1760042001943-8be600eb252f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBjaXR5c2NhcGUlMjBuaWdodCUyMG5lb24lMjBvcmFuZ2V8ZW58MHx8fHwxNzgwMjIzNTk5fDA&ixlib=rb-4.1.0&q=85";

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export const Services = ({ onBegin }) => {
    return (
        <section
            id="services"
            data-testid={NOXN.servicesSection}
            className="relative py-32 lg:py-40"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <motion.div {...fadeIn(0)} className="max-w-3xl mb-20">
                    <div className="font-mono-tech text-[11px] uppercase tracking-[0.35em] text-[#FF5A00] mb-6 flex items-center gap-3">
                        <span className="inline-block w-6 h-px bg-[#FF5A00]" />
                        02 / Services
                    </div>
                    <h2 className="font-display font-black tracking-tighter text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
                        Two services.<br />
                        <span className="text-slate-500">One unfair advantage.</span>
                    </h2>
                </motion.div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* CARD 1 / Ad Creation (large) */}
                    <motion.div
                        {...fadeIn(0.05)}
                        data-testid={NOXN.serviceCardCreation}
                        className="lg:col-span-7 lg:row-span-2 relative overflow-hidden border border-white/10 bg-[#142446] group hover:border-[#FF5A00]/40 transition-colors duration-500 min-h-[480px]"
                    >
                        <div className="absolute inset-0 -z-0">
                            <img src={LED_IMG} alt="LED display texture" className="w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#142446] via-[#142446]/60 to-transparent" />
                        </div>
                        <div className="relative z-10 p-10 lg:p-12 h-full flex flex-col justify-between">
                            <div className="flex items-start justify-between">
                                <span className="font-mono-tech text-[11px] uppercase tracking-[0.35em] text-slate-500">/ 01</span>
                                <Sparkles className="text-[#FF5A00]" size={22} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-display font-black tracking-tighter text-4xl lg:text-5xl text-white">
                                    Ad creation
                                </h3>
                                <p className="mt-4 text-slate-400 text-base lg:text-lg leading-relaxed max-w-lg">
                                    Motion-first creative built for the 8-second attention window of a digital
                                    billboard. From concept to delivery: pixel-perfect specs, every screen.
                                </p>
                                <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-300 max-w-md">
                                    {["Concept & storyboarding", "Motion design", "Copy & brand voice", "Multi-aspect masters"].map((i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <span className="w-1 h-1 bg-[#FF5A00]" />
                                            {i}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={onBegin}
                                    className="mt-10 inline-flex items-center gap-2 text-sm font-mono-tech uppercase tracking-widest text-white border-b border-[#FF5A00] pb-1 hover:gap-3 transition-all"
                                >
                                    Brief us <ArrowUpRight size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* CARD 2 / Ad Space */}
                    <motion.div
                        {...fadeIn(0.15)}
                        data-testid={NOXN.serviceCardSpace}
                        className="lg:col-span-5 relative overflow-hidden border border-white/10 bg-[#142446] group hover:border-[#FF5A00]/40 transition-colors duration-500 min-h-[300px]"
                    >
                        <div className="absolute inset-0 -z-0">
                            <img src={CITY_IMG} alt="City billboards" className="w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#142446] via-[#142446]/70 to-transparent" />
                        </div>
                        <div className="relative z-10 p-10 lg:p-12 h-full flex flex-col justify-between">
                            <div className="flex items-start justify-between">
                                <span className="font-mono-tech text-[11px] uppercase tracking-[0.35em] text-slate-500">/ 02</span>
                                <MapPin className="text-[#FF5A00]" size={22} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-display font-black tracking-tighter text-4xl lg:text-5xl text-white">
                                    Ad space
                                </h3>
                                <p className="mt-4 text-slate-400 text-base leading-relaxed max-w-md">
                                    Premium digital billboard inventory across high-foot-traffic corridors.
                                    Book by daypart, by zone, or by the entire skyline.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* CARD 3 / Credibility panel (replaces previous coverage + quote tiles) */}
                    <motion.div
                        {...fadeIn(0.25)}
                        data-testid="service-card-coordination"
                        className="lg:col-span-5 relative overflow-hidden border border-white/10 bg-[#142446] group hover:border-[#FF5A00]/40 transition-colors duration-500 min-h-[220px] grid grid-cols-1 sm:grid-cols-5"
                    >
                        <div className="relative sm:col-span-2 min-h-[200px] overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80"
                                alt="Campaign coordinator reviewing a digital billboard plan"
                                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#142446]/30 to-[#142446] sm:bg-gradient-to-r sm:from-transparent sm:to-[#142446]" />
                        </div>
                        <div className="sm:col-span-3 p-8 lg:p-10 flex flex-col justify-between">
                            <div className="font-mono-tech text-[11px] uppercase tracking-[0.35em] text-slate-400 mb-3">
                                / End-to-end coordination
                            </div>
                            <div>
                                <h3 className="font-display font-black tracking-tighter text-2xl lg:text-3xl text-white leading-tight">
                                    End-to-end campaign coordination
                                </h3>
                                <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-md">
                                    Site sourcing, booking, artwork coordination, and scheduling, managed through
                                    one process.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
