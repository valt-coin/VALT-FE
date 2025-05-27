import Pchase_Con from "../elements/Pchase_Con";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CompltPch = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function getCard() {
      const response = await axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getevent/${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getCard();
  }, [id]);

  const handleChange = (event: any) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleClick = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
      toast.error("Ensure you enter a valid email address.");
      return;
    }
  };

  return (
    <div className="flex w-full xs:px-4 sm:px-8 md:px-16 lg:px-40">
      <div className="flex flex-col w-full bg-darkDarkColor rounded-md p-10 sm:px-4 xs:px-0">
        <div className="flex w-full justify-center items-center p-6 sm:px-0">
          <p className="text-[36px] sm:text-[18px] leading-6 font-Poppins text-whiteTextColor">
            Purchase completed
          </p>
        </div>
        <Pchase_Con {...data} />
        <div className="flex flex-col w-full justify-center items-center pt-9">
          <p className="text-6 sm:text-[14px] leading-[32px] font-Poppins text-whiteTextColor">
            Your personal link(s) to event stream
          </p>
        </div>
        <div className="flex flex-col py-6 justify-center items-center">
          <div className="flex flex-row sm:flex-col justify-between items-center lg:w-[772px] sm:w-full">
            <div className="flex sm:flex-col w-full justify-center items-center gap-6">
              <input
                type="email"
                className="text-[18px] leading-6 font-Poppins text-whiteTextColor h-12 w-[772px] md:w-[424px] sm:w-full sm:max-w-[294px] pl-4 pr-2 py-2 flex ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent justify-end"
              ></input>
              <button className="w-[159px] sm:w-full sm:max-w-[294px] h-12 px-6 py-4 rounded-[90px] bg-greenColor flex justify-center items-center text-4 font-bold color-dark hover:bg-[#8ed6a9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6e6d2]">
                SEND
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-6 justify-center items-center">
          <div className="flex flex-row sm:flex-col justify-between items-center lg:w-[772px] sm:w-full">
            <div className="flex sm:flex-col w-full justify-center items-center gap-6">
              <input
                type="email"
                className="text-[18px] leading-6 font-Poppins text-whiteTextColor h-12 w-[772px] md:w-[424px] sm:w-full sm:max-w-[294px] pl-4 pr-2 py-2 flex ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent justify-end"
              ></input>
              <button className="w-[159px] sm:w-full sm:max-w-[294px] h-12 px-6 py-4 rounded-[90px] bg-greenColor flex justify-center items-center text-4 font-bold color-dark hover:bg-[#8ed6a9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6e6d2]">
                SEND
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center py-7">
          <p className="text-4 sm:text-[14px] leading-6 text-center font-Poppins text-whiteTextColor py-4">
            Each link is valid for one ion only
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row sm:flex-col justify-between items-center lg:w-[772px] sm:w-full">
            <div className="flex sm:flex-col w-full justify-center items-center gap-6">
              <p className="text-[18px] sm:text-[14px] leading-6 font-Poppins text-whiteTextColor py-4">
                Send to email:
              </p>
              <input
                type="email"
                value={inputValue}
                maxLength={30}
                onChange={handleChange}
                className="text-[18px] leading-6 font-Poppins text-whiteTextColor h-12 w-[316px] sm:w-full sm:max-w-[294px] pl-4 pr-2 py-2 flex ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent justify-end"
              ></input>
              <button
                className="w-[159px] sm:w-full sm:max-w-[294px] h-12 px-6 py-4 rounded-[90px] bg-greenColor flex justify-center items-center text-4 font-bold color-dark hover:bg-[#8ed6a9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6e6d2]"
                onClick={handleClick}
              >
                SEND
              </button>
            </div>
          </div>
          <p className="text-[18px] sm:text-[14px] xs:text-[12px] leading-[32px] w-64 text-center font-Poppins text-grayTextColor py-8">
            We do not save email address
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompltPch;
