import { motion } from "framer-motion";
import { NOXN } from "@/constants/testIds";

const KINETIC = "https://static.prod-images.emergentagent.com/jobs/7a9b6db3-da51-486d-b381-a72900b8fc1d/images/81bba1a5347dacd6a59923d5712c95bde5d01ad7b7146a76d238b3bc90a17d22.png";

const steps = [
    {
        n: "01",
        title: "Brief",
        body: "Tell us the goal, the launch window, the budget. Five minutes through the assessment form.",
    },
    {
        n: "02",
        title: "Concept",
        body: "Within 48 hours, you get a moodboard, a script and a target screen map. Approve in one click.",
    },
    {
        n: "03",
        title: "Build",
        body: "Our motion team produces the ad in every aspect ratio your booked screens demand.",
    },
    {
        n: "04",
        title: "Go live",
        body: "Your campaign lights up on the agreed date. Live impression reports land in your inbox.",
    },
];

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export const Process = () => {
    return (
        <section
            id="process"
            data-testid={NOXN.processSection}
            className="relative py-32 lg:py-40 overflow-hidden"
        >
            <div className="absolute inset-0 -z-10">
                <img src={KINETIC} alt="" className="w-full h-full object-cover opacity-15" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050B14] via-[#050B14]/85 to-[#050B14]" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <motion.div {...fadeIn(0)} className="max-w-3xl mb-20">
                    <div className="font-mono-tech text-[11px] uppercase tracking-[0.35em] text-[#FF5A00] mb-6 flex items-center gap-3">
                        <span className="inline-block w-6 h-px bg-[#FF5A00]" />
                        03 — How it works
                    </div>
                    <h2 className="font-display font-black tracking-tighter text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
                        From idea<br />
                        <span className="text-slate-500">to skyline. In four steps.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
                    {steps.map((s, i) => (
                        <motion.div
                            key={s.n}
                            {...fadeIn(0.05 * i)}
                            data-testid={NOXN.processStep(s.n)}
                            className="bg-[#050B14] p-10 lg:p-12 hover:bg-[#0B132B] transition-colors duration-500 group"
                        >
                            <div className="font-display font-black text-7xl lg:text-8xl text-white/5 group-hover:text-[#FF5A00]/30 transition-colors duration-500 leading-none">
                                {s.n}
                            </div>
                            <div className="mt-8">
                                <h3 className="font-display font-black tracking-tight text-2xl text-white">
                                    {s.title}
                                </h3>
                                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                                    {s.body}
                                </p>
                            </div>
                            <div className="mt-8 h-px w-12 bg-[#FF5A00] group-hover:w-full transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
