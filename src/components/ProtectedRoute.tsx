"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { OWNER_WALLET_ADDRESS, OWNER_ALT_WALLET_ADDRESS } from "@/utils";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isConnected, address } = useAccount();
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const isAdminPath =
        pathname === "/admin" || pathname.startsWith("/admin/");
      const isOwner =
        address?.toLowerCase() === OWNER_WALLET_ADDRESS.toLowerCase() ||
        address?.toLowerCase() === OWNER_ALT_WALLET_ADDRESS.toLowerCase();

      if (!isConnected && pathname !== "/" && !(isAdminPath && isOwner)) {
        toast.error("Please connect your wallet to access this page.");
        router.replace("/");
      } else if (isConnected && isAdminPath && !isOwner) {
        toast.error("You are not authorized to access this page.");
        router.replace("/");
      }

      setTimeout(() => setIsChecking(true), 500);
    };

    checkAccess();
  }, [address, isConnected, pathname, router]);

  return <>{isChecking && children}</>;
};

export default ProtectedRoute;
