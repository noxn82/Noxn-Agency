import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, X, Loader2 } from "lucide-react";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { NOXN } from "@/constants/testIds";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ----- Schemas per step -----
const step1Schema = z.object({
    campaign_goal: z.string().min(1, "Pick a campaign goal"),
});

const step2Schema = z.object({
    services: z.array(z.string()).min(1, "Select at least one service"),
});

const step3Schema = z.object({
    budget_range: z.string().min(1, "Pick a budget range"),
    timeline: z.string().min(1, "Pick a timeline"),
});

const step4Schema = z.object({
    target_locations: z.string().min(2, "Tell us where you want to be seen"),
});

const step5Schema = z.object({
    business_name: z.string().min(1, "Required"),
    contact_name: z.string().min(1, "Required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().optional(),
    notes: z.string().optional(),
});

const fullSchema = step1Schema
    .merge(step2Schema)
    .merge(step3Schema)
    .merge(step4Schema)
    .merge(step5Schema);

const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema, step5Schema];
const stepFields = [
    ["campaign_goal"],
    ["services"],
    ["budget_range", "timeline"],
    ["target_locations"],
    ["business_name", "contact_name", "email", "phone", "notes"],
];

const goals = [
    { value: "product_launch", label: "Launch a new product" },
    { value: "brand_awareness", label: "Build brand awareness" },
    { value: "event_promo", label: "Promote an event" },
    { value: "local_traffic", label: "Drive local foot traffic" },
    { value: "other", label: "Something else" },
];

const servicesOptions = [
    { value: "ad_creation", label: "Ad creation", desc: "Concept + motion design + masters" },
    { value: "ad_space", label: "Ad space", desc: "Premium digital billboard inventory" },
];

const budgets = [
    "Under $2k", "$2k – $5k", "$5k – $15k", "$15k – $50k", "$50k+"
];

const timelines = [
    "Within 2 weeks", "Within 1 month", "1 – 3 months", "Flexible / exploring",
];

export const AssessmentForm = ({ open, onOpenChange }) => {
    const [step, setStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const {
        register,
        handleSubmit,
        trigger,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(fullSchema),
        mode: "onTouched",
        defaultValues: {
            campaign_goal: "",
            services: [],
            budget_range: "",
            timeline: "",
            target_locations: "",
            business_name: "",
            contact_name: "",
            email: "",
            phone: "",
            notes: "",
        },
    });

    const values = watch();

    const handleClose = () => {
        onOpenChange(false);
        setTimeout(() => {
            setStep(0);
            setDone(false);
            reset();
        }, 300);
    };

    const next = async () => {
        const valid = await trigger(stepFields[step]);
        if (!valid) return;
        setStep((s) => Math.min(s + 1, stepSchemas.length - 1));
    };

    const prev = () => setStep((s) => Math.max(s - 1, 0));

    const onSubmit = async (data) => {
        setSubmitting(true);
        try {
            await axios.post(`${API}/assessments`, data);
            setDone(true);
            toast.success("Assessment received. We'll be in touch within 1 business day.");
        } catch (e) {
            const msg = e?.response?.data?.detail || "Could not submit. Try again.";
            toast.error(typeof msg === "string" ? msg : "Could not submit. Try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const toggleService = (val) => {
        const current = values.services || [];
        const updated = current.includes(val)
            ? current.filter((v) => v !== val)
            : [...current, val];
        setValue("services", updated, { shouldValidate: true });
    };

    const totalSteps = stepSchemas.length;
    const progress = ((step + 1) / totalSteps) * 100;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                data-testid={NOXN.formModal}
                className="max-w-2xl w-[95vw] bg-[#050B14] border border-white/10 p-0 gap-0 rounded-none [&>button]:hidden"
            >
                <DialogTitle className="sr-only">NOXN Campaign Assessment</DialogTitle>
                <DialogDescription className="sr-only">
                    Let's start prepping your campaign
                </DialogDescription>

                {/* Header */}
                <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/5">
                    <div>
                        <div className="font-mono-tech text-[10px] uppercase tracking-[0.35em] text-[#FF5A00]">
                            NOXN / Assessment
                        </div>
                        <div className="mt-1 text-white font-display text-xl tracking-tight">
                            Let's start prepping your campaign
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-slate-400 hover:text-white transition"
                        data-testid="form-close-btn"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Progress */}
                {!done && (
                    <div className="px-8 pt-6">
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] font-mono-tech text-slate-500 mb-3">
                            <span>Step {step + 1} of {totalSteps}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-px bg-white/10 relative overflow-hidden">
                            <div
                                className="h-full bg-[#FF5A00] transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8 min-h-[420px] flex flex-col">
                    {done ? (
                        <SuccessState onClose={handleClose} />
                    ) : (
                        <>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -16 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-1"
                                    data-testid={NOXN.formStep(step + 1)}
                                >
                                    {step === 0 && (
                                        <Step
                                            title="What's the campaign goal?"
                                            subtitle="Pick the one that fits best."
                                        >
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {goals.map((g) => (
                                                    <OptionButton
                                                        key={g.value}
                                                        active={values.campaign_goal === g.value}
                                                        onClick={() =>
                                                            setValue("campaign_goal", g.value, { shouldValidate: true })
                                                        }
                                                        testId={NOXN.formField(`goal-${g.value}`)}
                                                    >
                                                        {g.label}
                                                    </OptionButton>
                                                ))}
                                            </div>
                                            <FieldError msg={errors.campaign_goal?.message} />
                                        </Step>
                                    )}

                                    {step === 1 && (
                                        <Step
                                            title="Which services do you need?"
                                            subtitle="Pick one or both."
                                        >
                                            <div className="grid grid-cols-1 gap-3">
                                                {servicesOptions.map((s) => {
                                                    const active = values.services?.includes(s.value);
                                                    return (
                                                        <button
                                                            type="button"
                                                            key={s.value}
                                                            onClick={() => toggleService(s.value)}
                                                            data-testid={NOXN.formField(`service-${s.value}`)}
                                                            className={`group text-left p-5 border transition-all flex items-start justify-between gap-4 ${
                                                                active
                                                                    ? "border-[#FF5A00] bg-[#FF5A00]/5"
                                                                    : "border-white/10 hover:border-white/30 bg-transparent"
                                                            }`}
                                                        >
                                                            <div>
                                                                <div className="font-display font-bold text-white text-lg">{s.label}</div>
                                                                <div className="text-sm text-slate-400 mt-1">{s.desc}</div>
                                                            </div>
                                                            <div
                                                                className={`w-5 h-5 border flex items-center justify-center shrink-0 mt-1 ${
                                                                    active ? "border-[#FF5A00] bg-[#FF5A00]" : "border-white/20"
                                                                }`}
                                                            >
                                                                {active && <Check size={14} className="text-white" strokeWidth={3} />}
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <FieldError msg={errors.services?.message} />
                                        </Step>
                                    )}

                                    {step === 2 && (
                                        <Step
                                            title="Budget & timing"
                                            subtitle="Ballpark is fine — we'll refine together."
                                        >
                                            <div className="space-y-6">
                                                <div>
                                                    <Label>Budget range</Label>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                                                        {budgets.map((b) => (
                                                            <OptionButton
                                                                key={b}
                                                                small
                                                                active={values.budget_range === b}
                                                                onClick={() =>
                                                                    setValue("budget_range", b, { shouldValidate: true })
                                                                }
                                                                testId={NOXN.formField(`budget-${b.replace(/[^a-z0-9]/gi, "-")}`)}
                                                            >
                                                                {b}
                                                            </OptionButton>
                                                        ))}
                                                    </div>
                                                    <FieldError msg={errors.budget_range?.message} />
                                                </div>
                                                <div>
                                                    <Label>When do you want to go live?</Label>
                                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                                        {timelines.map((t) => (
                                                            <OptionButton
                                                                key={t}
                                                                small
                                                                active={values.timeline === t}
                                                                onClick={() =>
                                                                    setValue("timeline", t, { shouldValidate: true })
                                                                }
                                                                testId={NOXN.formField(`timeline-${t.replace(/[^a-z0-9]/gi, "-")}`)}
                                                            >
                                                                {t}
                                                            </OptionButton>
                                                        ))}
                                                    </div>
                                                    <FieldError msg={errors.timeline?.message} />
                                                </div>
                                            </div>
                                        </Step>
                                    )}

                                    {step === 3 && (
                                        <Step
                                            title="Where do you want to be seen?"
                                            subtitle="Cities, neighborhoods, highways — whatever's relevant."
                                        >
                                            <textarea
                                                {...register("target_locations")}
                                                data-testid={NOXN.formField("target_locations")}
                                                placeholder="e.g. Brooklyn (Williamsburg + DUMBO), Austin downtown, anywhere near LAX"
                                                rows={5}
                                                className="w-full bg-[#0B132B] border border-white/10 text-white p-4 text-sm placeholder:text-slate-500 focus:border-[#FF5A00] transition-colors"
                                            />
                                            <FieldError msg={errors.target_locations?.message} />
                                        </Step>
                                    )}

                                    {step === 4 && (
                                        <Step
                                            title="Tell us about you"
                                            subtitle="We'll send a tailored plan within one business day."
                                        >
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <FormInput
                                                    label="Business name"
                                                    register={register("business_name")}
                                                    testId={NOXN.formField("business_name")}
                                                    error={errors.business_name?.message}
                                                />
                                                <FormInput
                                                    label="Your name"
                                                    register={register("contact_name")}
                                                    testId={NOXN.formField("contact_name")}
                                                    error={errors.contact_name?.message}
                                                />
                                                <FormInput
                                                    label="Email"
                                                    type="email"
                                                    register={register("email")}
                                                    testId={NOXN.formField("email")}
                                                    error={errors.email?.message}
                                                />
                                                <FormInput
                                                    label="Phone (optional)"
                                                    register={register("phone")}
                                                    testId={NOXN.formField("phone")}
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <Label>Anything else? (optional)</Label>
                                                <textarea
                                                    {...register("notes")}
                                                    data-testid={NOXN.formField("notes")}
                                                    rows={3}
                                                    placeholder="Creative references, deadlines, dream screens..."
                                                    className="mt-2 w-full bg-[#0B132B] border border-white/10 text-white p-4 text-sm placeholder:text-slate-500 focus:border-[#FF5A00] transition-colors"
                                                />
                                            </div>
                                        </Step>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Footer nav */}
                            <div className="pt-8 mt-auto border-t border-white/5 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={prev}
                                    disabled={step === 0}
                                    data-testid={NOXN.formPrevBtn}
                                    className="inline-flex items-center gap-2 text-sm font-mono-tech uppercase tracking-widest text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ArrowLeft size={16} /> Back
                                </button>

                                {step < totalSteps - 1 ? (
                                    <button
                                        type="button"
                                        onClick={next}
                                        data-testid={NOXN.formNextBtn}
                                        className="inline-flex items-center gap-2 bg-[#FF5A00] hover:bg-[#E65200] text-white px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-colors"
                                    >
                                        Continue <ArrowRight size={16} />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        data-testid={NOXN.formSubmitBtn}
                                        className="inline-flex items-center gap-2 bg-[#FF5A00] hover:bg-[#E65200] disabled:opacity-60 text-white px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-colors"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" /> Sending
                                            </>
                                        ) : (
                                            <>
                                                Submit assessment <Check size={16} />
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
};

const Step = ({ title, subtitle, children }) => (
    <div>
        <h3 className="font-display font-black tracking-tighter text-white text-2xl sm:text-3xl">
            {title}
        </h3>
        {subtitle && (
            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        )}
        <div className="mt-8">{children}</div>
    </div>
);

const OptionButton = ({ active, onClick, children, small, testId }) => (
    <button
        type="button"
        onClick={onClick}
        data-testid={testId}
        className={`text-left border transition-all ${
            small ? "px-4 py-2.5 text-sm" : "px-5 py-4 text-sm"
        } ${
            active
                ? "border-[#FF5A00] bg-[#FF5A00]/10 text-white"
                : "border-white/10 hover:border-white/30 text-slate-300 hover:text-white"
        }`}
    >
        {children}
    </button>
);

const Label = ({ children }) => (
    <div className="text-[10px] uppercase tracking-[0.3em] font-mono-tech text-slate-500">
        {children}
    </div>
);

const FormInput = ({ label, type = "text", register, error, testId }) => (
    <div>
        <Label>{label}</Label>
        <input
            type={type}
            {...register}
            data-testid={testId}
            className="mt-2 w-full bg-[#0B132B] border border-white/10 text-white px-4 py-3 text-sm placeholder:text-slate-500 focus:border-[#FF5A00] transition-colors"
        />
        <FieldError msg={error} />
    </div>
);

const FieldError = ({ msg }) =>
    msg ? <div className="mt-2 text-xs text-[#FF5A00]">{msg}</div> : null;

const SuccessState = ({ onClose }) => (
    <div data-testid={NOXN.formSuccess} className="flex-1 flex flex-col items-center justify-center text-center py-10">
        <div className="w-16 h-16 border border-[#FF5A00] flex items-center justify-center mb-8 border-glow-orange">
            <Check className="text-[#FF5A00]" size={28} strokeWidth={2.5} />
        </div>
        <h3 className="font-display font-black tracking-tighter text-white text-3xl">
            We've got it.
        </h3>
        <p className="mt-4 text-slate-400 max-w-md text-sm">
            A NOXN campaign director will reach out within one business day with a tailored plan
            and screen recommendations. Keep an eye on your inbox.
        </p>
        <button
            type="button"
            onClick={onClose}
            className="mt-10 inline-flex items-center gap-2 border border-white/15 hover:border-white/40 text-white px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-colors"
        >
            Close
        </button>
    </div>
);
