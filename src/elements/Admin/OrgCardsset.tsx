import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import OrganizerCard from "@/elements/Admin/OrgCards";
import Swal from "sweetalert2";
import { ankrApiKey } from "@/config";
import { useRouter } from "next/navigation";
import { useAccount, useSwitchChain, useWriteContract } from "wagmi";
import { SALE_CONTRACT_ADDRESS } from "@/utils";
import VALT_SWAP_CONTRACT_ABI from "@/utils/valtswapABI.json";
import { bsc } from "wagmi/chains";

const OrgCardsset = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { chainId, connector, isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const { writeContractAsync, isPending } = useWriteContract();

  const getAllOrganizers = async () => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getallorganizers`)
      .then((res) => {
        handleEventsByOrganizer(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEventsByOrganizer = async (data: any) => {
    const newData = data.map((item: any) => {
      return {
        ...item,
        active_count: item.events.filter(
          (event: any) => event.active == "Active"
        ).length,
        inactive_count: item.events.filter(
          (event: any) => event.active == "Inactive"
        ).length,
        finished_count: item.events.filter(
          (event: any) => new Date(event.offerdate) < new Date()
        ).length,
      };
    });
    setData(newData);
  };

  const handleOrgActivate = async (id: string, active: boolean) => {
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/setactive`, {
        id,
        active,
      })
      .then((res) => {
        toast.success("Success! Organizer Updated. 🎉");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleViewOrganizer = async (_id: string) => {
    if (!_id) return;
    router.push(`/admin/vieworg/${_id}`);
  };

  const handleEditOrganizer = async (_id: string) => {
    if (!_id) return;
    router.push(`/admin/editorg/${_id}`);
  };

  const handleDeleteOrganizer = async (_id: string, wallet: string) => {
    if (!_id) return;
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      color: "white",
      background: "#252b3b",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

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

    try {
      await writeContractAsync({
        abi: VALT_SWAP_CONTRACT_ABI,
        address: SALE_CONTRACT_ADDRESS,
        functionName: "removeOrganizer",
        args: [wallet],
      });
    } catch (error: any) {
      error && toast.error(error.shortMessage);
      return;
    }

    try {
      const res: any = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/delete_org/${_id}`
      );
      toast.success("Success! Organizer Deleted. 🎉");
      setTimeout(
        () =>
          setData((prevData) =>
            prevData.filter(
              (Organizer: any) => Organizer._id !== res.data.deletedOrg._id
            )
          ),
        1000
      );
    } catch (err) {
      console.error("Error deleting organizer:", err);
    }
  };

  useEffect(() => {
    getAllOrganizers();
  }, []);

  return (
    <div>
      {data.map((el: any, index: number) => {
        return (
          <OrganizerCard
            {...el}
            key={index}
            isPending={isPending}
            onActivate={handleOrgActivate}
            onView={handleViewOrganizer}
            onEdit={handleEditOrganizer}
            onDelete={handleDeleteOrganizer}
          />
        );
      })}
    </div>
  );
};

export default OrgCardsset;
