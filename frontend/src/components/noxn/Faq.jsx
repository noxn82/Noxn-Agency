import { motion } from "framer-motion";
import { NOXN } from "@/constants/testIds";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        q: "Do I need to provide finished creative to book a screen?",
        a: "No. Most clients come in with just an idea. Our team handles concept, motion design and final masters in every aspect ratio your booked screens require.",
    },
    {
        q: "How quickly can a campaign go live?",
        a: "From a signed brief to your first impression: 5 to 7 business days. We can fast-track time-sensitive launches in 72 hours on the Signal or Supernova packages.",
    },
    {
        q: "Which cities are you live in?",
        a: "14 metros today, with 6 more activating this quarter. After you complete the assessment we share a live screen map with foot-traffic and impression data for each location.",
    },
    {
        q: "How do you measure performance?",
        a: "Every booking includes verified play logs, estimated impressions based on traffic models, and (on Signal/Supernova) dwell-time and direction-of-travel analytics.",
    },
    {
        q: "What if my campaign needs to change mid-flight?",
        a: "Creative swaps are free on Signal and Supernova. We push updated assets to the network in under 4 hours.",
    },
    {
        q: "Is there a minimum spend?",
        a: "The Spark package starts at $1,200 and includes both creative and media. There is no annual contract, no setup fee.",
    },
];

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export const Faq = () => {
    return (
        <section
            id="faq"
            data-testid={NOXN.faqSection}
            className="relative py-32 lg:py-40"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <motion.div {...fadeIn(0)} className="lg:col-span-5">
                        <div className="font-mono-tech text-[11px] uppercase tracking-[0.35em] text-[#FF5A00] mb-6 flex items-center gap-3">
                            <span className="inline-block w-6 h-px bg-[#FF5A00]" />
                            05 / FAQ
                        </div>
                        <h2 className="font-display font-black tracking-tighter text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
                            Questions, <br />
                            <span className="text-slate-500">answered straight.</span>
                        </h2>
                        <p className="mt-8 text-slate-400 max-w-md text-base">
                            Still curious? Start the assessment, we reply with a custom plan within one business day.
                        </p>

                        <div className="mt-12 relative border border-white/10 overflow-hidden max-w-md hidden sm:block">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
                                alt="NOXN client lead reviewing a campaign plan"
                                className="w-full h-72 object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-[#FF5A00] mb-2">
                                    / Real conversations
                                </div>
                                <div className="font-display text-base text-white leading-snug">
                                    A campaign director reads every brief. You speak to a person, not a queue.
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div {...fadeIn(0.1)} className="lg:col-span-7">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((f, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`item-${i}`}
                                    data-testid={NOXN.faqItem(i)}
                                    className="border-b border-white/10 last:border-b-0"
                                >
                                    <AccordionTrigger className="text-left text-white font-display font-medium text-lg lg:text-xl hover:no-underline py-6 hover:text-[#FF5A00] transition-colors">
                                        {f.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-400 text-base leading-relaxed pb-6 pr-8">
                                        {f.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
