'use client'
import BackHeader from "../../../layouts/BackHeader";
import AdminFooter from "../../../layouts/AdminFooter";
import Header from "../../../layouts/Header";
import AddOrganizers from "../../../layouts/AddOrganizers";
import { useEffect } from "react";
const AddOrganizer = () => {
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
            <AddOrganizers />
            <AdminFooter />
        </div>
    )
}

export default AddOrganizer;