
import type { Metadata } from "next";
import ContactForm from "./components/ContactForm";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
    title: "Contact",
    description: "If you have any query the feel free to contact us..",
};

const ContactPage = () => {



    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-background p-6">
                <ContactForm/>
            </div>

            <Footer />
        </>
    );
};

export default ContactPage;
