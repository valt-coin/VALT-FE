import Cardpre from "../elements/card_pre";
import MainCpn from "../elements/MainCpn";
import TextSection from "../elements/TextSection";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const Eventview = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getCard() {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getevent/${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getCard();
  }, [id]);
  return (
    <div className="flex flex-col gap-8 xs:px-4 sm:px-8 md:px-16 lg:px-40">
      <Cardpre {...data} />
      <TextSection {...data} />
      <MainCpn {...data} />
    </div>
  );
};

export default Eventview;
