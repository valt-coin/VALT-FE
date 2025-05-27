'use client'
import Header from "../../../layouts/Header";
import BackHeader from "../../../layouts/BackHeader";
import Card from "../../../elements/card";
import TextSection from "../../../elements/TextSection";
import MainCpn from "../../../elements/MainCpn";
import Footer from "../../../layouts/Footer";
import Reportbar from "../../../layouts/Admin/Reportbar";
import Reportcontent from "../../../layouts/Admin/Reportcontent";
import { useEffect } from "react";
const Report = () => {
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
            <Reportbar />
            <Reportcontent />
            <Footer />
        </div>
    )
}

export default Report;