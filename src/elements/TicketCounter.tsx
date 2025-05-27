import { useAccountContext } from "@/context/account";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

type TicketCounterProps = {
  gen_invvalt: number;
  vip_invvalt: number;
  vipb_invvalt: number;
  gen_invnum: number;
  vip_invnum: number;
  vipb_invnum: number;
  gen_invlimit: number;
  vip_invlimit: number;
  vipb_invlimit: number;
  selectedTicket: number;
  ticketInvCnt: number;
  setTicketInvCnt: React.Dispatch<React.SetStateAction<number>>;
};

const TicketCounter = ({
  gen_invvalt,
  gen_invnum,
  gen_invlimit,
  vip_invvalt,
  vip_invnum,
  vip_invlimit,
  vipb_invvalt,
  vipb_invnum,
  vipb_invlimit,
  selectedTicket,
  ticketInvCnt,
  setTicketInvCnt,
}: TicketCounterProps) => {
  const router = useRouter();
  const { id } = useParams();

  const { handleInvInfo } = useAccountContext();
  const [purchaseValt, setPurchaseValt] = useState<number>(0);
  const [ticketValue, setTicketValue] = useState<number>(0);

  useEffect(() => {
    setTicketInvCnt(1);
    setTicketValue(
      selectedTicket !== 1
        ? selectedTicket !== 2
          ? Number(vipb_invvalt)
          : Number(vip_invvalt)
        : Number(gen_invvalt)
    );
  }, [selectedTicket, gen_invvalt, vip_invvalt, vipb_invvalt, setTicketInvCnt]);

  useEffect(() => {
    const purchaseAmount = Math.max(0, ticketValue * ticketInvCnt);
    setPurchaseValt(purchaseAmount);
    handleInvInfo(selectedTicket, ticketInvCnt, purchaseAmount);
  }, [ticketValue, ticketInvCnt, selectedTicket]);

  const handlePlus = () => {
    (isNaN(ticketValue) || ticketValue === 0) &&
      toast.error("Please select a ticket type.");
    const limits = [gen_invlimit, vip_invlimit, vipb_invlimit];
    const limit = limits[selectedTicket - 1];

    if (ticketInvCnt >= limit) {
      toast.error(`You can only buy ${limit} invitations at once.`);
      return;
    }
    const stocks = [gen_invnum, vip_invnum, vipb_invnum];
    const remaining = stocks[selectedTicket - 1];

    if (ticketInvCnt >= remaining) {
      toast.error(`Not enough ticket invitations. Remaining: ${remaining}`);
      return;
    }
    setTicketInvCnt(ticketInvCnt + 1);
  };

  const handleMinus = () => {
    setTicketInvCnt(Math.max(ticketInvCnt - 1, 1));
  };

  const handleClick = async () => {
    if (selectedTicket === 0) {
      toast.error("Please select a ticket type.");
      return;
    }
    const limits = [gen_invlimit, vip_invlimit, vipb_invlimit];
    const limit = limits[selectedTicket - 1];

    if (ticketInvCnt > limit) {
      toast.error(`You can only buy ${limit} invitations at once.`);
    }
    const stocks = [gen_invnum, vip_invnum, vipb_invnum];
    const remaining = stocks[selectedTicket - 1];

    if (ticketInvCnt > remaining) {
      toast.error(`Not enough ticket invitations. Remaining: ${remaining}`);
      return;
    }
    router.push(`/invite/${id}`);
  };
  return (
    <div className="w-full flex flex-col justify-center items-center md:mt-4">
      <div className="w-full flex flex-row justify-center items-center gap-[18px] md:mt-[-36px]">
        <button
          className="rounded-full focus:outline-none focus:ring focus:ring-greenColor"
          onClick={() => handleMinus()}
        >
          <Image
            src="/assets/img/minus_icon.png"
            width={62}
            height={62}
            className="w-[62px] min-w-[32px]"
            alt="minus_icon"
          ></Image>
        </button>
        <Image
          src="/assets/img/wallet_icon.png"
          width={62}
          height={62}
          className="w-[62px] min-w-[32px]"
          alt="wallet_icon"
        ></Image>
        <p className="text-[80px] sm:text-[56px] xs:text-[40px] font-bold text-greenColor">
          {!isNaN(purchaseValt) ? purchaseValt : 0}
        </p>
        <button
          className="rounded-full focus:outline-none focus:ring focus:ring-greenColor"
          onClick={() => handlePlus()}
        >
          <Image
            src="/assets/img/plus_icon.png"
            width={62}
            height={62}
            className="w-[62px] min-w-[32px]"
            alt="plus_icon"
          ></Image>
        </button>
      </div>
      <button
        className="w-[184px] xs:w-[124px] py-[16px] px-[24px] xs:py-2 sm:mt-2 xs:mt-4 rounded-[90px] bg-greenColor flex justify-center items-center text-[16px] xs:text-[14px] font-bold color-dark hover:bg-[#8ed6a9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6e6d2]"
        onClick={handleClick}
      >
        {purchaseValt > 0 ? <>BUY $VALT</> : <>CHANGE</>}
      </button>
    </div>
  );
};

export default TicketCounter;
