"use client";
import Header from "../../layouts/Header";
import BackHeader from "../../layouts/BackHeader";
import Footer from "../../layouts/Footer";
import AddOrganizers from "../../layouts/AddOrganizers";
import { useEffect } from "react";
import { useParams } from "next/navigation";

const EditOrgClient = () => {
  const { id } = useParams();

  useEffect(() => {
    const unlisten = () => {
      window.scrollTo(0, 0);
    };
    return () => {
      unlisten();
    };
  }, []);

  if (!id) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <BackHeader />
      <AddOrganizers vtype="edit" />
      <Footer />
    </div>
  );
};

export default EditOrgClient;
