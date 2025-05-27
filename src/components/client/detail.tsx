"use client";
import Header from "../../layouts/Header";
import BackHeader from "../../layouts/BackHeader";
import Footer from "../../layouts/Footer";
import Eventview from "../../layouts/Eventview";
import { useEffect } from "react";
import { useParams } from "next/navigation";

const DetailClient = () => {
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
      <Eventview />
      <Footer />
    </div>
  );
};

export default DetailClient;
