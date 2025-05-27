'use client'
import AddEvents from "../../../layouts/AddEvents";
import BackHeader from "../../../layouts/BackHeader";
import Footer from "../../../layouts/Footer";
import Header from "../../../layouts/Header";

import { useEffect } from "react";
const AddEvent = () => {
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
            <Header />
            <BackHeader />
            <AddEvents />
            <Footer />
        </div>
    )
}

export default AddEvent;