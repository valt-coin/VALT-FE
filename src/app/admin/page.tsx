'use client'
import Header from "../../layouts/Header";
import BackHeader from "../../layouts/BackHeader";
import Card from "../../elements/card";
import TextSection from "../../elements/TextSection";
import MainCpn from "../../elements/MainCpn";
import AdminFooter from "../../layouts/AdminFooter";
import AdminEventlistbar from "../../layouts/Admin/AdminEventlistbar";
import AdminEventlist from "../../layouts/Admin/AdminEventlist";
import { useEffect } from "react";
const AdminHome = () => {
    useEffect(() => {
        const unlisten = (() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        };
    }, []);

    return (
        <>
            {/* <Header/> */}
            <Header />
            <AdminEventlistbar />
            <AdminEventlist />
            <AdminFooter />
        </>
    )
}

export default AdminHome;