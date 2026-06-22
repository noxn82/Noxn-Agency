import { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import { Header } from "@/components/noxn/Header";
import { Hero } from "@/components/noxn/Hero";
import { Services } from "@/components/noxn/Services";
import { Process } from "@/components/noxn/Process";
import { Pricing } from "@/components/noxn/Pricing";
import { Faq } from "@/components/noxn/Faq";
import { Footer } from "@/components/noxn/Footer";
import { AssessmentForm } from "@/components/noxn/AssessmentForm";
import { MobileCtaFloater } from "@/components/noxn/MobileCtaFloater";

const Landing = () => {
    const [open, setOpen] = useState(false);
    const onBegin = () => setOpen(true);

    return (
        <div className="App font-body">
            <Header onBegin={onBegin} />
            <main>
                <Hero onBegin={onBegin} />
                <Services onBegin={onBegin} />
                <Process />
                <Pricing onBegin={onBegin} />
                <Faq />
            </main>
            <Footer onBegin={onBegin} />
            <AssessmentForm open={open} onOpenChange={setOpen} />
            <MobileCtaFloater onBegin={onBegin} hidden={open} />
            <Toaster
                theme="dark"
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#142446",
                        color: "#fff",
                        border: "1px solid rgba(255,90,0,0.4)",
                        borderRadius: 0,
                    },
                }}
            />
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
