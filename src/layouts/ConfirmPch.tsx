import Pchase_Con from "../elements/Pchase_Con";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAccountContext } from "@/context/account";
import emailjs from "emailjs-com";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { QRCodeSVG } from "qrcode.react";

const ConfirmInv = ({
  gen_invtitle,
  gen_invnum,
  vip_invtitle,
  vip_invnum,
  vipb_invtitle,
  vipb_invnum,
}: any) => {
  const router = useRouter();
  const { id } = useParams();
  const {
    ticket,
    ticket_invcnt,
    purchaseAmount,
    purchaseTx,
    purchasePassport,
  } = useAccountContext();
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

    const message =
      (ticket !== 1
        ? ticket !== 2
          ? vipb_invtitle
          : vip_invtitle
        : gen_invtitle) +
      " entrance × " +
      ticket_invcnt;

    try {
      await emailjs.send(
        "service_rfvexxy", // Replace with your EmailJS Service ID
        "template_8ixgkgp", // Replace with your EmailJS Template ID
        {
          email: inputValue,
          message,
        },
        "cF31Df324REtGheGD" // Replace with your EmailJS Public Key
      );
      toast.success(
        "We sent QR invitation to your email address. Enjoy event and thank you for choising $VALT"
      );
      setTimeout(() => router.push("/"), 1000);
      // router.push(`/complete/${id}`);
    } catch (error) {
      console.error("Error Sending Email:", error);
      toast.error("Failed To Send Email.");
    }
  };

  return (
    <div className="flex w-full xs:px-4 sm:px-8 md:px-16 lg:px-40">
      <div className="flex flex-col w-full bg-darkDarkColor rounded-md p-10 sm:px-4 xs:px-0">
        <div className=" flex w-full justify-center items-center p-6 sm:px-0">
          <p className="text-[36px] sm:text-[24px] xs:text-[16px] leading-[24px] font-Poppins text-whiteTextColor">
            Purchase completed
          </p>
        </div>
        <Pchase_Con {...data} />
        <div className="flex flex-col w-full justify-center items-center pt-9">
          <p className="text-[24px] sm:text-[18px] xs:text-[16px] leading-[32px] font-Poppins text-whiteTextColor">
            Invitation:
          </p>
        </div>
        <div className="flex flex-col w-full justify-center items-center py-6">
          <div className="hover:bg-[#252b3b] active:bg-[#232e3b] w-auto flex flex-col py-6 px-14 sm:px-6 gap-x-8 sm:gap-y-2 rounded-3xl bg-grayBackgroundColor justify-center items-center">
            <div className="flex bg-grayColor rounded-full w-12 h-12 justify-center items-center">
              <div className="flex">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1_9052)">
                    <path
                      d="M3 1L15 5V23L3 19V1ZM3 1H21V19H18"
                      stroke="#FCFCFD"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M11 13V15"
                      stroke="#FCFCFD"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_9052">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex py-2 flex-col justify-center items-center">
              <p className="p-2 text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                {ticket !== 1
                  ? ticket !== 2
                    ? vipb_invtitle
                    : vip_invtitle
                  : gen_invtitle}{" "}
                entrance
              </p>
              <p className="p-2 text-[46px] xs:text-[36px] leading-[24px] font-Poppins text-whiteTextColor">
                × {ticket_invcnt}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center py-7">
          {/* <Image
            width={180}
            height={180}
            src="/assets/img/qr-code 1.png"
            className="w-[180px] h-[180px] block"
            alt="qr-code"
          ></Image> */}
          <QRCodeSVG
            value={JSON.stringify({
              tx: purchaseTx,
              passport: purchasePassport,
              type: ticket,
              qty: purchaseAmount,
            })}
            marginSize={3}
            size={160}
          />
          <p className="text-[16px] sm:text-[12px] leading-[24px] w-80 sm:w-64 xs:w-full text-center font-Poppins text-whiteTextColor p-4">
            Find the entrance with logo $VALT and show this QR code to staff
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

export default ConfirmInv;
