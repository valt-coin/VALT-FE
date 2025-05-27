'use client'
import Header from "../../../layouts/Header";
import OrganizerFooter from "../../../layouts/OrganizerFooter";
import OrganizerEventlistbar from "../../../layouts/Admin/OrganizerEventlistbar";
import Organizerslist from "../../../layouts/Admin/Organizerslist";
import { useEffect } from "react";
const Organizers = () => {
    useEffect(() => {
        const unlisten = (() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        };
    }, []);

    return (
        <div>
            {/* <Header/> */}
            <Header />
            <OrganizerEventlistbar />
            <Organizerslist />
            <OrganizerFooter />
        </div>
    )
}

export default Organizers;