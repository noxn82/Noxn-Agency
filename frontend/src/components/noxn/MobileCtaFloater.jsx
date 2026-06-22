import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Sticky mobile-only CTA floater.
 * Appears after the user scrolls past the hero, hides when the assessment
 * modal is open, opens the form on tap.
 */
export const MobileCtaFloater = ({ onBegin, hidden = false }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const show = visible && !hidden;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="md:hidden fixed bottom-4 inset-x-4 z-40"
                >
                    <button
                        onClick={onBegin}
                        data-testid="mobile-floater-cta"
                        className="w-full bg-[#FF5A00] hover:bg-[#E65200] text-white px-6 py-4 text-sm font-semibold uppercase tracking-widest border-glow-orange inline-flex items-center justify-center gap-2"
                    >
                        Put me on a billboard
                        <span aria-hidden>→</span>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
