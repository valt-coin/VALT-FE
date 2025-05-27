import { useState } from "react";
import { useAccountContext } from "@/context/account";
import Image from "next/image";
import TicketCounter from "./TicketCounter";

const MainCpn = ({
  type,
  gen_invvalt,
  gen_invnum,
  gen_invlimit,
  gen_invtitle,
  vip_invvalt,
  vip_invnum,
  vip_invlimit,
  vip_invtitle,
  vipb_invvalt,
  vipb_invnum,
  vipb_invlimit,
  vipb_invtitle,
}: any) => {
  const { valtBalance, purchaseAmount } = useAccountContext();

  const [ticketInvCnt, setTicketInvCnt] = useState<number>(0);
  const [selectedTicket, setSelectedTicket] = useState<number>(0);

  return (
    <div className="w-full flex flex-col items-center xs:px-0 sm:p-10 md:p-10 lg:py-10 lg:px-[152px] gap-8 rounded-2xl bg-darkGrayColor">
      <div className="w-full flex flex-col items-center justify-center rounded-3xl bg-darkgrayBackgroundColor sm:hidden md:hidden p-6 gap-3">
        <Image
          src="/assets/img/wallet_icon.png"
          width={56}
          height={56}
          className="w-[56px] h-[56px]"
          alt="wallet_icon"
        />
        <div className="text-2xl leading-[50px] font-semibold text-whiteTextColor">
          My wallet:
        </div>
        <div className="text-[42px] leading-[50px] font-semibold text-greenColor">
          {valtBalance}
        </div>
      </div>
      <div className="flex w-full">
        <div className="py-2 px-4 md:px-44 sm:px-2 flex flex-row justify-between items-center gap-6 sm:flex-col lg:flex-row md:flex-col w-full overflow-x-hidden">
          <button
            className={`relative w-[256px] md:w-full md:min-w-[256px] sm:w-full gap-3 h-[462px] bg-darkgrayBackgroundColor rounded-3xl flex items-center flex-col p-6
                    hover:bg-[#252b3b] active:bg-[#232e3b] focus:outline-none ring-greenColor ${
                      selectedTicket === 1 && "ring"
                    } `}
            onClick={() => {
              setSelectedTicket(1);
            }}
          >
            <Image
              src="/assets/img/general_entrance.png"
              width={48}
              height={48}
              className="w-[48px] h-[48px]"
              alt="general_entrance"
            ></Image>
            <p className="text-[24px] sm:text-[18px] leading-[30px] font-semibold text-whiteTextColor">
              {gen_invtitle}
            </p>
            <p className="text-[24px] sm:text-[18px] leading-[30px] font-semibold text-whiteTextColor">
              entrance
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor pt-2">
              Included
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor">
              Sunset Chill DJ set
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor pt-2">
              Snacks
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor pt-2">
              Drinks(Alc/nAld)
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor">
              {type}
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor pt-2">
              {selectedTicket === 1 && (
                <p>
                  BUY {purchaseAmount} $VALT GET {ticketInvCnt} FREE INVITATION
                </p>
              )}
            </p>
            <div className="absolute bottom-[20px] text-[26px] leading-[24px] font-semibold text-greenColor">
              {gen_invvalt}
            </div>
          </button>
          {selectedTicket === 1 && (
            <div className="w-full lg:hidden md:block sm:block">
              <TicketCounter
                gen_invvalt={gen_invvalt}
                vip_invvalt={vip_invvalt}
                vipb_invvalt={vipb_invvalt}
                gen_invnum={gen_invnum}
                vip_invnum={vip_invnum}
                vipb_invnum={vipb_invnum}
                gen_invlimit={gen_invlimit}
                vip_invlimit={vip_invlimit}
                vipb_invlimit={vipb_invlimit}
                selectedTicket={selectedTicket}
                ticketInvCnt={ticketInvCnt}
                setTicketInvCnt={setTicketInvCnt}
              />
            </div>
          )}
          <button
            className={`relative w-[256px] md:w-full md:min-w-[256px] sm:w-full gap-3 h-[462px] bg-darkgrayBackgroundColor rounded-3xl flex items-center  flex-col p-6
                    hover:bg-[#252b3b] active:bg-[#232e3b] focus:outline-none ring-greenColor ${
                      selectedTicket === 2 && "ring"
                    } `}
            onClick={() => {
              setSelectedTicket(2);
            }}
          >
            <Image
              src="/assets/img/vip_icon.png"
              width={48}
              height={48}
              className="w-[48px] h-[48px]"
              alt="vip_icon"
            ></Image>
            <p className="text-[24px] sm:text-[18px] leading-[30px] font-semibold text-whiteTextColor">
              {vip_invtitle}
            </p>
            <p className="text-[24px] sm:text-[18px] leading-[30px] font-semibold text-whiteTextColor">
              entrance
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor pt-2">
              Included
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor">
              Sunset Chill DJ set
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor pt-2">
              Snacks
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor pt-2">
              Drinks(Alc/nAld)
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor">
              {type}
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor pt-2">
              {selectedTicket === 2 && (
                <p>
                  BUY {purchaseAmount} $VALT GET {ticketInvCnt} FREE INVITATION
                </p>
              )}
            </p>
            <div className="absolute bottom-[20px] text-[26px] leading-[24px] font-semibold text-greenColor">
              {vip_invvalt}
            </div>
          </button>
          {selectedTicket === 2 && (
            <div className="w-full lg:hidden md:block sm:block">
              <TicketCounter
                gen_invvalt={gen_invvalt}
                vip_invvalt={vip_invvalt}
                vipb_invvalt={vipb_invvalt}
                gen_invnum={gen_invnum}
                vip_invnum={vip_invnum}
                vipb_invnum={vipb_invnum}
                gen_invlimit={gen_invlimit}
                vip_invlimit={vip_invlimit}
                vipb_invlimit={vipb_invlimit}
                selectedTicket={selectedTicket}
                ticketInvCnt={ticketInvCnt}
                setTicketInvCnt={setTicketInvCnt}
              />
            </div>
          )}
          <button
            className={`relative w-[256px] md:w-full md:min-w-[256px] sm:w-full gap-3 h-[462px] bg-darkgrayBackgroundColor rounded-3xl flex items-center  flex-col p-6
                    hover:bg-[#252b3b] active:bg-[#232e3b] focus:outline-none ring-greenColor ${
                      selectedTicket === 3 && "ring"
                    } `}
            onClick={() => {
              setSelectedTicket(3);
            }}
          >
            <Image
              src="/assets/img/vip_icon2.png"
              width={48}
              height={48}
              className="w-[48px] h-[48px]"
              alt="vip_icon2"
            ></Image>
            <p className="text-[24px] sm:text-[18px] leading-[30px] font-semibold text-whiteTextColor">
              {vipb_invtitle}
            </p>
            <p className="text-[24px] sm:text-[18px] leading-[30px] font-semibold text-whiteTextColor">
              entrance
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor pt-2">
              Included
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor">
              Sunset Chill DJ set
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor pt-2">
              Snacks
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor pt-2">
              Drinks(Alc/nAld)
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor">
              {type}
            </p>
            <p className="text-[14px] leading-[20px] font-normal text-whiteTextColor pt-2">
              {selectedTicket === 3 && (
                <p>
                  BUY {purchaseAmount} $VALT GET {ticketInvCnt} FREE INVITATION
                </p>
              )}
            </p>
            <div className="absolute bottom-[20px] text-[26px] leading-[24px] font-semibold text-greenColor">
              {vipb_invvalt}
            </div>
          </button>
          {selectedTicket === 3 && (
            <div className="w-full lg:hidden md:block sm:block">
              <TicketCounter
                gen_invvalt={gen_invvalt}
                vip_invvalt={vip_invvalt}
                vipb_invvalt={vipb_invvalt}
                gen_invnum={gen_invnum}
                vip_invnum={vip_invnum}
                vipb_invnum={vipb_invnum}
                gen_invlimit={gen_invlimit}
                vip_invlimit={vip_invlimit}
                vipb_invlimit={vipb_invlimit}
                selectedTicket={selectedTicket}
                ticketInvCnt={ticketInvCnt}
                setTicketInvCnt={setTicketInvCnt}
              />
            </div>
          )}
        </div>
      </div>
      {/* <p className="text-3xl font-medium text-whiteTextColor sm:hidden md:block lg:hidden">
        Total $VALT
      </p> */}
      <div className="w-full lg:block md:hidden sm:hidden">
        <TicketCounter
          gen_invvalt={gen_invvalt}
          vip_invvalt={vip_invvalt}
          vipb_invvalt={vipb_invvalt}
          gen_invnum={gen_invnum}
          vip_invnum={vip_invnum}
          vipb_invnum={vipb_invnum}
          gen_invlimit={gen_invlimit}
          vip_invlimit={vip_invlimit}
          vipb_invlimit={vipb_invlimit}
          selectedTicket={selectedTicket}
          ticketInvCnt={ticketInvCnt}
          setTicketInvCnt={setTicketInvCnt}
        />
      </div>
    </div>
  );
};

export default MainCpn;
