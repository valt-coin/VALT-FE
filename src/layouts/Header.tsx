"use client";
import { useRouter } from "next/navigation";
import { useAccountContext } from "@/context/account";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const { ethBalance, bnbBalance, usdtBalance, valtBalance } =
    useAccountContext();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <>
      <div className="relative justify-center text-white w-full lg:py-[20px] lg:px-[80px] sm:py-[24px] sm:px-4 md:py-[24px] md:px-8 flex flex-row gap-9 items-center border-grayBackgroundColor border-x-0 border-y-2">
        <button onClick={handleClick}>
          <Image
            src="/assets/img/Logo.png"
            width={60}
            height={60}
            className="w-28 sm:w-20 min-w-9"
            alt="Logo"
          ></Image>
        </button>
        <div className="border border-grayBackgroundColor h-[50px] sm:hidden"></div>
        <div className="flex flex-wrap-reverse justify-between w-full items-center gap-x-0 gap-y-3">
          <div className="flex flex-row items-center sm:hidden md:order-1">
            <Image
              src="/assets/img/valt.png"
              width={40}
              height={40}
              className="w-10 h-10"
              alt="VALT"
            ></Image>
            <p className="ml-[10px] text-3 font-bold text-greyfont">$VALT</p>
            <p className="pl-6 text-[18px] md:text-3 font-semibold">
              {valtBalance}
            </p>
          </div>
          <div className="flex flex-row items-center sm:hidden">
            <Image
              src="/assets/img/USDT.png"
              width={40}
              height={40}
              className="w-10 h-10"
              alt="USDT"
            ></Image>
            <p className="ml-[10px] text-3 font-bold text-greyfont">
              $USDT(BEP20)
            </p>
            <p className="pl-6 text-[18px] md:text-3 font-semibold">
              {usdtBalance}
            </p>
          </div>

          <div className="flex flex-row items-center sm:hidden">
            <Image
              src="/assets/img/BNB.png"
              width={40}
              height={40}
              className="w-10 h-10"
              alt="BNB"
            ></Image>
            <p className="ml-[10px] text-3 font-bold text-greyfont">$BNB</p>
            <p className="pl-6 text-[18px] md:text-3 font-semibold">
              {bnbBalance}
            </p>
          </div>

          <div className="flex flex-row items-center sm:hidden">
            <Image
              src="/assets/img/Eth.png"
              width={40}
              height={40}
              className="w-10 h-10"
              alt="ETH"
            ></Image>
            <p className="ml-[10px] text-3 font-bold text-greyfont">$ETH</p>
            <p className="pl-6 text-[18px] md:text-3 font-semibold">
              {ethBalance}
            </p>
          </div>
        </div>
        <div className="pr-5">
          <div className="h-10 items-center justify-center md:hidden sm:hidden">
            {" "}
            <w3m-button />
          </div>
        </div>
        <div className="hidden sm:block w-[21.3px] h-[10.6px] border-y-2 border-grayBackgroundColor flex-shrink-0 "></div>
      </div>
      <div className="flex flex-row gap-9 mt-5 sm:px-4 md:px-8 text-white float-right">
        <div className="h-10 items-center justify-center lg:hidden">
          {" "}
          <w3m-button />
        </div>
      </div>
    </>
  );
};

export default Header;
