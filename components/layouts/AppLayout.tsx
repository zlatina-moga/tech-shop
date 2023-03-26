import { ReactNode } from "react";
import Meta from "./Meta";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <>
            <Meta />
            {children}
            
        </>
    )
};
