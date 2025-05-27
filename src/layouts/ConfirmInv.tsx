import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import {
  useAccount,
  useSwitchAccount,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import { useAccountContext } from "@/context/account";
import Image from "next/image";
import VALT_SWAP_CONTRACT_ABI from "@/utils/valtswapABI.json";
import BINANCE_USDT_CONTRACT_ABI from "@/utils/bep20.json";
import {
  BINANCE_USDT_ADDRESSE,
  BINANCE_VALT_CONTRACT_ADDRESS,
  SALE_CONTRACT_ADDRESS,
} from "@/utils";
import { toast } from "react-toastify";
import { parseUnits } from "viem";
import axios from "axios";
import { bsc } from "wagmi/chains";
import { ankrApiKey } from "@/config";

const ConfirmInv = ({
  gen_invtitle,
  gen_invnum,
  gen_invvalt,
  vip_invtitle,
  vip_invnum,
  vip_invvalt,
  vipb_invtitle,
  vipb_invnum,
  vipb_invvalt,
  organizer,
  organizerId,
}: any) => {
  const router = useRouter();
  const { id } = useParams();
  const [inputValue, setInputValue] = useState<string>("");
  const {
    address,
    usdtBalance,
    ticket,
    ticket_invcnt,
    purchaseAmount,
    refetchBalances,
    handlePurchaseInfo,
  } = useAccountContext();
  const { chainId, connector, isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync, isPending, isError } = useWriteContract();

  const handleSwap = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    if (inputValue.length !== 4) {
      toast.error("Please type 4 digits");
      return;
    }
    if (usdtBalance < purchaseAmount) {
      toast.error("Insufficient USDT balance");
      return;
    }
    const stock = [gen_invnum, vip_invnum, vipb_invnum];
    const remain_invcnt = stock[ticket - 1] - ticket_invcnt;
    if (remain_invcnt < 0) {
      toast.error(`Not enough invitations. Remaining: ${stock[ticket - 1]}`);
      return;
    }
    if (
      organizer.length === 0 ||
      (organizer.length !== 0 && !organizer[0].wallet)
    ) {
      toast.error("Organizer wallet not found.");
      return;
    }

    if (chainId !== bsc.id) {
      try {
        await switchChainAsync({
          connector,
          chainId: bsc.id,
          addEthereumChainParameter: {
            chainName: bsc.name,
            nativeCurrency: bsc.nativeCurrency,
            rpcUrls: [`https://rpc.ankr.com/bsc/${ankrApiKey}`],
            blockExplorerUrls: [bsc.blockExplorers.default.url],
          },
        });
        console.log("Switched to BSC Mainnet");
      } catch (switchError: any) {
        // Check if error is due to chain not added (error code 4902)
        console.log("Failed to switch chain:", switchError.code);
        console.log("BSC Mainnet not found, attempting to add chain");
      }
    }

    const amount = parseUnits(purchaseAmount.toString(), 18);

    try {
      const approveTx = await writeContractAsync({
        abi: BINANCE_USDT_CONTRACT_ABI,
        address: BINANCE_USDT_ADDRESSE,
        functionName: "approve",
        args: [SALE_CONTRACT_ADDRESS, amount],
      });
    } catch (error: any) {
      error && toast.error(error.shortMessage);
      return;
    }

    try {
      const userConfirmed = window.confirm(
        `Confirm transaction:\nFunction: swap\nArguments:\n- Amount: ${purchaseAmount.toString()}\n- Organizer Wallet: ${
          organizer[0].wallet
        }`
      );
      if (!userConfirmed) return;
      const swapTx = await writeContractAsync({
        abi: VALT_SWAP_CONTRACT_ABI,
        address: SALE_CONTRACT_ADDRESS,
        functionName: "swapUsdtForValt",
        args: [amount, organizer[0].wallet],
      });

      toast.success("Transaction Hash: " + swapTx);
      refetchBalances();
      handlePurchaseInfo(swapTx, inputValue);
      handleNewPurchase(swapTx);
      handleUpdateEvent(remain_invcnt.toString());
      router.push(`/purchase/${id}`);
    } catch (error: any) {
      error && toast.error(error.shortMessage);
      return;
    }
  };

  const handleNewPurchase = async (txHash: string) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/addpurchase`, {
        wallet_address: address,
        event_id: id,
        event_ticket: ticket,
        purchase_invcnt: ticket_invcnt,
        purchase_valtcnt: purchaseAmount,
        transaction: txHash,
        organizerId,
      })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateEvent = async (remain: string) => {
    await axios
      .put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/update_event/${id}`, {
        gen_invnum: ticket === 1 ? remain : gen_invnum,
        vip_invnum: ticket === 2 ? remain : vip_invnum,
        vipb_invnum: ticket === 3 ? remain : vipb_invnum,
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMainPage = () => {
    router.push("/");
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <div className="flex w-full xs:px-4 sm:px-8 md:px-16 lg:px-40">
      <div className="flex flex-col w-full bg-darkDarkColor rounded-md p-10 sm:p-4 relative">
        {isPending && !isError && (
          <>
            <div className="bg-lightgray absolute start-0 top-0 size-full z-10"></div>
            <div
              role="status"
              className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 z-20"
            >
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <span className="ml-2 text-pinkColor">Swap processing...</span>
            </div>
          </>
        )}
        <div className=" flex w-full justify-center items-center p-6 sm:px-0">
          <p className="text-[36px] leading-6 sm:text-xl font-Poppins text-white">
            Please confirm a deal
          </p>
        </div>
        <div className="flex flex-col w-full justify-center items-center py-4">
          <p className="text-[36px] leading-6 sm:text-xl font-Poppins text-white">
            You purchase
          </p>
          <div className="w-full flex flex-row justify-center items-center gap-[18px] py-4">
            <Image
              src="/assets/img/wallet_icon.png"
              width={56}
              height={56}
              className="w-[62px] h-[62px] block"
              alt="wallet_icon"
            ></Image>
            <p className="flex text-5xl font-bold text-greenColor">
              {purchaseAmount}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center py-[25px]">
          <p className="text-[36px] leading-6 sm:text-xl font-Poppins text-white">
            Your free invitation(s)
          </p>
          <div className="w-full  flex flex-row justify-center items-center gap-[18px] pt-9">
            <p className="text-5xl font-bold text-greenColor">
              {ticket_invcnt}
            </p>
          </div>
          <p className="text-6 font-Poppins text-white">
            {ticket !== 1
              ? ticket !== 2
                ? vipb_invtitle
                : vip_invtitle
              : gen_invtitle}{" "}
            entrance
          </p>
        </div>
        <div className="flex flex-col justify-center items-center py-7">
          <div className="relative flex flex-row w-full max-w-60">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 font-bold pointer-events-none">
              USDT
            </span>
            <input
              type="number"
              max="9999"
              className="w-full pl-16 pr-3 rounded-lg ring-2 ring-greenColor bg-gray-50 font-bold text-greenColor placeholder-gray-400 text-4xl text-right outline-none"
              value={purchaseAmount}
              onChange={(e) => {}}
            />
          </div>
          <div className="flex flex-col w-full justify-center items-center py-4">
            <p className="text-lg sm:text-sm font-Poppins text-grayTextColor py-6">
              You will not be able to cancel the transaction or refuse it
            </p>
            <p className="text-lg sm:text-sm leading-6 font-Poppins text-white py-4">
              Last 4 digits of your passport:
            </p>
            <input
              type="text"
              value={inputValue}
              maxLength={4}
              onChange={handleChange}
              className="text-grayWhiteColor text-lg leading-6 font-Poppins h-12 w-full max-w-[256px]  pl-4 pr-2 py-2 flex ring-2 ring-inset ring-greenColor items-center rounded-[12px] bg-transparent justify-end"
            ></input>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center p-4">
          <div className="flex w-full p-4 justify-center items-center">
            <button
              type="submit"
              className="w-[184px] py-4 px-6 rounded-[90px] bg-greenColor flex justify-center items-center text-4 font-bold color-dark hover:bg-[#8ed6a9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6e6d2]"
              onClick={handleSwap}
              disabled={isPending}
            >
              CONFIRM
            </button>
          </div>
          <div className="flex w-full p-4 justify-center items-center">
            <button
              className="w-[184px] py-4 px-6 rounded-[90px] bg-transparent flex justify-center items-center text-4 font-bold text-grayTextColor hover:bg-[#252b3b] active:bg-[#232e3b]"
              onClick={handleMainPage}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmInv;
