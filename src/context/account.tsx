"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAccount, useBalance, useAccountEffect } from "wagmi";
import { mainnet, bsc } from "wagmi/chains";
import {
  BINANCE_VALT_CONTRACT_ADDRESS,
  BINANCE_USDT_ADDRESSE,
} from "@/utils";
import axios from "axios";

interface AccountContextType {
  address?: string;
  ethBalance: number;
  bnbBalance: number;
  usdtBalance: number;
  valtBalance: number;
  ticket: number;
  ticket_invcnt: number;
  purchaseTx: string;
  purchasePassport: string;
  purchaseAmount: number;
  refetchBalances: () => void;
  handleInvInfo: (ticket: number, invcnt: number, amount: number) => void;
  handlePurchaseInfo: (tx: string, passport: string) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { address } = useAccount();

  const { data: ethBalanceData, refetch: refetchEthBalance } = useBalance({
    address,
    chainId: mainnet.id,
  });
  const { data: bnbBalanceData, refetch: refetchBnbBalance } = useBalance({
    address,
    chainId: bsc.id,
  });
  const { data: usdtBalanceData, refetch: refetchUsdtBalance } = useBalance({
    address,
    token: BINANCE_USDT_ADDRESSE,
    chainId: bsc.id,
  });
  const { data: valtBalanceData, refetch: refetchValtBalance } = useBalance({
    address,
    token: BINANCE_VALT_CONTRACT_ADDRESS,
    chainId: bsc.id,
  });

  const [ethBalance, setETHBalance] = useState<number>(0);
  const [bnbBalance, setBNBBalance] = useState<number>(0);
  const [usdtBalance, setUSDTBalance] = useState<number>(0);
  const [valtBalance, setVALTBalance] = useState<number>(0);
  const [ticket, setTicket] = useState<number>(0);
  const [ticket_invcnt, setTicketInvCnt] = useState<number>(0);
  const [purchaseTx, setPurchaseTx] = useState<string>("");
  const [purchasePassport, setPurchasePassport] = useState<string>("");
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);

  const handleAddWallet = useCallback(async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/addwallet`, {
        address,
        ether: ethBalanceData?.formatted,
        bnb: bnbBalanceData?.formatted,
        bep20_usdt: usdtBalanceData?.formatted,
        valt: valtBalanceData?.formatted,
      })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }, [
    address,
    ethBalanceData,
    bnbBalanceData,
    usdtBalanceData,
    valtBalanceData,
  ]);

  useEffect(() => {
    const truncateBalance = (balance?: { formatted: string }) =>
      Math.trunc(Number(balance?.formatted || "0") * 1000) / 1000;

    setETHBalance(truncateBalance(ethBalanceData));
    setBNBBalance(truncateBalance(bnbBalanceData));
    setUSDTBalance(truncateBalance(usdtBalanceData));
    setVALTBalance(truncateBalance(valtBalanceData));

    ethBalanceData &&
      bnbBalanceData &&
      usdtBalanceData &&
      valtBalanceData &&
      handleAddWallet();
  }, [
    ethBalanceData,
    bnbBalanceData,
    usdtBalanceData,
    valtBalanceData,
    handleAddWallet,
  ]);

  useAccountEffect({
    onConnect() {
      console.log("Wallet Connected");
      refetchBalances();
    },
    onDisconnect() {
      console.log("Wallet Disconnected");
      refetchBalances();
    },
  });

  const refetchBalances = () => {
    refetchEthBalance();
    refetchBnbBalance();
    refetchUsdtBalance();
    refetchValtBalance();
  };

  const handleInvInfo = (
    ticket_type: number,
    ticket_inv_count: number,
    purchase_amount: number
  ) => {
    setTicket(ticket_type);
    setTicketInvCnt(ticket_inv_count);
    setPurchaseAmount(purchase_amount);
  };

  const handlePurchaseInfo = (tx: string, passport: string) => {
    setPurchaseTx(tx);
    setPurchasePassport(passport);
  };

  return (
    <AccountContext.Provider
      value={{
        address,
        ethBalance,
        bnbBalance,
        usdtBalance,
        valtBalance,
        ticket,
        ticket_invcnt,
        purchaseTx,
        purchasePassport,
        purchaseAmount,
        refetchBalances,
        handleInvInfo,
        handlePurchaseInfo,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context)
    throw new Error("useAccountContext must be used within AccountProvider");
  return context;
};
