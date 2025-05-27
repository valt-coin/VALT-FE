"use client";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { config } from "@/config";
import { cookieToInitialState } from "wagmi";
import { WalletProvider } from "@/components/basicComponents/Web3Context";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AccountProvider } from "@/context/account";
import dynamic from "next/dynamic";

const Web3ModalProvider = dynamic(() => import("@/context"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initState = cookieToInitialState(config);
  return (
    <html lang="en">
      <body>
        <Web3ModalProvider initialState={initState}>
          <WalletProvider>
            <AccountProvider>
              <ProtectedRoute>{children}</ProtectedRoute>
            </AccountProvider>
          </WalletProvider>
        </Web3ModalProvider>
        <ToastContainer position="top-right" theme="light" autoClose={5000} />
      </body>
    </html>
  );
}
