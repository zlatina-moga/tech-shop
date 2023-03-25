import { ReactNode } from "react";
import Footer from "../global/Footer";
import Meta from "./Meta";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <>
            <Meta />
            
            {/*<Navbar /> Scripts*/}

            {children}
            
            <Footer />
        </>
    )
};
