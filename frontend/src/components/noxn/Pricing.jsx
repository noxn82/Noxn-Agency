import { useState } from "react";
import { motion } from "framer-motion";
import { NOXN } from "@/constants/testIds";
import { Check, ChevronDown } from "lucide-react";

const AD_PLAY_OPTIONS = [
    { value: "500", label: "500 plays" },
    { value: "2000", label: "2,000 plays" },
    { value: "5000", label: "5,000 plays" },
];

const tiers = [
    {
        slug: "spark",
        name: "Spark",
        price: "$150",
        unit: "/ ad creation",
        tag: "For first launches",
        features: [
            "1 creative concept",
            "1 ad variant (HD master)",
            "Up to 4 screens · single city",
            "12-second spots · 6× per hour",
            "Basic impression report",
        ],
        recommended: false,
    },
    {
        slug: "signal",
        name: "Signal",
        price: "$250",
        unit: "/ ad creation",
        tag: "Most popular",
        features: [
            "2 creative concepts",
            "3 ad variants · multi-aspect",
            "Up to 12 screens · 2 cities",
            "15-second spots · 10× per hour",
            "Daypart targeting",
            "Weekly impression + dwell reports",
        ],
        recommended: true,
    },
    {
        slug: "skyline",
        name: "Skyline",
        price: "$500",
        unit: "/ ad creation",
        tag: "Launches & events",
        features: [
            "Unlimited creative iterations",
            "Full-network access · all cities",
            "Sequenced storytelling across screens",
            "Live editorial control",
            "Dedicated campaign director",
            "Real-time analytics dashboard",
        ],
        recommended: false,
    },
];

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const PricingCard = ({ tier, index, onBegin }) => {
    const [plays, setPlays] = useState(AD_PLAY_OPTIONS[0].value);

    return (
        <motion.div
            {...fadeIn(0.08 * index)}
            data-testid={NOXN.pricingCard(tier.slug)}
            className={`relative p-10 transition-all duration-500 hover:-translate-y-1 ${
                tier.recommended
                    ? "bg-[#142446] border border-[#FF5A00]/60 border-glow-orange"
                    : "bg-[#142446] border border-white/10 hover:border-white/30"
            }`}
        >
            {tier.recommended && (
                <div className="absolute -top-3 left-10 bg-[#FF5A00] text-white text-[10px] font-mono-tech uppercase tracking-[0.3em] px-3 py-1">
                    Recommended
                </div>
            )}
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.35em] text-slate-500 mb-3">
                {tier.tag}
            </div>
            <h3 className="font-display font-black tracking-tighter text-4xl text-white">
                {tier.name}
            </h3>
            <div className="mt-6 flex items-baseline gap-2">
                <div className="font-display font-black text-5xl tracking-tighter text-white">
                    {tier.price}
                </div>
                <div className="text-xs text-slate-500 font-mono-tech uppercase tracking-wider">
                    {tier.unit}
                </div>
            </div>

            <div className="my-8 h-px bg-white/10" />

            {/* Ad Plays dropdown */}
            <div className="mb-6">
                <label
                    htmlFor={`plays-${tier.slug}`}
                    className="block font-mono-tech text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-2"
                >
                    Ad plays
                </label>
                <div className="relative">
                    <select
                        id={`plays-${tier.slug}`}
                        data-testid={`pricing-plays-${tier.slug}`}
                        value={plays}
                        onChange={(e) => setPlays(e.target.value)}
                        className="appearance-none w-full bg-[#0A1628] border border-white/10 text-white text-sm px-4 py-3 pr-10 focus:border-[#FF5A00] hover:border-white/30 transition-colors cursor-pointer font-body"
                    >
                        {AD_PLAY_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#0A1628] text-white">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF5A00] pointer-events-none"
                        strokeWidth={2}
                    />
                </div>
            </div>

            <ul className="space-y-3">
                {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                        <Check size={16} className="text-[#FF5A00] shrink-0 mt-0.5" strokeWidth={2.5} />
                        {f}
                    </li>
                ))}
            </ul>

            <button
                onClick={onBegin}
                data-testid={NOXN.pricingCta(tier.slug)}
                className={`mt-10 w-full inline-flex items-center justify-center gap-2 py-3.5 text-sm font-semibold uppercase tracking-widest transition-all ${
                    tier.recommended
                        ? "bg-[#FF5A00] hover:bg-[#E65200] text-white"
                        : "bg-transparent border border-white/15 text-white hover:bg-white/5 hover:border-white/40"
                }`}
            >
                Let's begin →
            </button>
        </motion.div>
    );
};

export const Pricing = ({ onBegin }) => {
    return (
        <section
            id="pricing"
            data-testid={NOXN.pricingSection}
            className="relative py-32 lg:py-40"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <motion.div {...fadeIn(0)} className="max-w-3xl mb-20">
                    <div className="font-mono-tech text-[11px] uppercase tracking-[0.35em] text-[#FF5A00] mb-6 flex items-center gap-3">
                        <span className="inline-block w-6 h-px bg-[#FF5A00]" />
                        04 / Packages
                    </div>
                    <h2 className="font-display font-black tracking-tighter text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
                        Pricing built<br />
                        <span className="text-slate-500">for launches, not for billboards.</span>
                    </h2>
                    <p className="mt-8 text-slate-400 max-w-xl text-base">
                        Everything below includes ad creation + ad space. No hidden production fees.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tiers.map((t, i) => (
                        <PricingCard key={t.slug} tier={t} index={i} onBegin={onBegin} />
                    ))}
                </div>
            </div>
        </section>
    );
};
