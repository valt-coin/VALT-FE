import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAccount, useSwitchChain, useWriteContract } from "wagmi";
import { SALE_CONTRACT_ADDRESS } from "@/utils";
import VALT_SWAP_CONTRACT_ABI from "@/utils/valtswapABI.json";
import { bsc } from "wagmi/chains";
import { ankrApiKey } from "@/config";

interface OrgFormData {
  organizer: string;
  name: string;
  surname: string;
  country: string;
  city: string;
  telegram: string;
  phone: string;
  email: string;
  wallet: string;
  organizerId: string;
  active: boolean;
}

interface AddOrganizerProps {
  vtype?: string;
}

const AddOrganizers: React.FC<AddOrganizerProps> = ({ vtype }) => {
  const [formData, setFormData] = useState<OrgFormData>({
    organizer: "",
    name: "",
    surname: "",
    country: "",
    city: "",
    telegram: "",
    phone: "",
    email: "",
    wallet: "",
    organizerId: Date.now().toString(),
    active: true,
  });

  const requiredFields = [
    { organizer: "Organizer" },
    { name: "Name" },
    { surname: "Surname" },
    { country: "Country" },
    { city: "City" },
    { telegram: "Telegram" },
    { phone: "Phone" },
    { email: "Email" },
    { wallet: "Wallet" },
  ];

  const router = useRouter();
  const { id } = useParams();
  const { chainId, connector, isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync, isPending } = useWriteContract();
  const [currentWallet, setCurrentWallet] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    async function getEventByID() {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getorganizer/${id}`)
        .then((res) => {
          setFormData(res.data);
          setCurrentWallet(res.data.wallet);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getEventByID();
  }, [id]);

  const validateForm = (): boolean => {
    try {
      requiredFields.forEach((fieldObject) => {
        const [key, value] = Object.entries(fieldObject)[0];
        if (
          Object.keys(formData).includes(key) &&
          !formData[key as keyof OrgFormData]
        ) {
          toast.error(`${value} is required`);
          throw new Error("Validation failed");
        }
      });
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error("Ensure you enter a valid email address.");
        throw new Error("Validation failed");
      }
      if (!/^0x[a-fA-F0-9]{40}$/.test(formData.wallet)) {
        toast.error("Organizer wallet address is invalid.");
        throw new Error("Validation failed");
      }
      if (formData.wallet === "0x0000000000000000000000000000000000000000") {
        toast.error("Wallet cannot be the zero address.");
        throw new Error("Validation failed");
      }
      console.log("Validation passed");
      return true;
    } catch (error) {
      console.log("Error: Validation failed");
      return false;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    console.log(event.target.required);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

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

    if (!id) {
      try {
        await writeContractAsync({
          abi: VALT_SWAP_CONTRACT_ABI,
          address: SALE_CONTRACT_ADDRESS,
          functionName: "addOrganizer",
          args: [formData.wallet],
        });
      } catch (error: any) {
        error && toast.error(error.shortMessage);
        return;
      }
    } else {
      if (currentWallet != formData.wallet) {
        try {
          await writeContractAsync({
            abi: VALT_SWAP_CONTRACT_ABI,
            address: SALE_CONTRACT_ADDRESS,
            functionName: "replaceOrganizer",
            args: [currentWallet, formData.wallet],
          });
        } catch (error: any) {
          error && toast.error(error.shortMessage);
          return;
        }
      }
    }

    const method = id ? "put" : "post";
    const url = id
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/update_org/${id}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/addorganizer`;

    try {
      const res = await axios({
        method,
        url,
        data: { ...formData },
        headers: { "Content-Type": "application/json" },
      });

      !id
        ? toast.success("Success! Organizer Added. 🎉")
        : toast.success("Success! Organizer Updated. 🎉");

      setTimeout(() => router.push("/admin/organizer"), 1000);
    } catch (err) {
      console.error("Error updating organizer:", err);
    }
  };

  const handleCancel = async (e: any) => {
    router.push("/admin/organizer");
  };

  return (
    <div className="flex w-full py-6 xs:py-0">
      <div className="flex flex-col w-full bg-darkDarkColor rounded-md p-10 sm:px-4">
        <div className=" flex w-full justify-center items-center">
          <p className="text-[36px] sm:text-[28px] xs:text-[20px] leading-[24px] font-Poppins text-whiteTextColor">
            {vtype !== "view"
              ? vtype !== "edit"
                ? "Add Organizer"
                : ""
              : "View Organizer"}
          </p>
        </div>
        <div className="flex flex-col lg:px-[104px] lg:pt-[65px]">
          <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 py-10 justify-center items-center gap-8">
            <div className="flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                Organizer
              </p>
              <input
                type="text"
                name="organizer"
                placeholder="Organizer"
                className="h-12 w-full px-5 invert text-[#1b1b1b] text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-[#a74282] items-center rounded-[12px] bg-transparent"
                value={formData.organizer}
                onChange={handleChange}
                readOnly={vtype === "view" ? true : false}
                required
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                Name
              </p>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="h-12 w-full px-5 invert text-[#1b1b1b] text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-[#a74282] items-center rounded-[12px] bg-transparent"
                value={formData.name}
                onChange={handleChange}
                readOnly={vtype === "view" ? true : false}
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                Surname
              </p>
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                className="h-12 w-full px-5 invert text-[#1b1b1b] text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-[#a74282] items-center rounded-[12px] bg-transparent"
                value={formData.surname}
                onChange={handleChange}
                readOnly={vtype === "view" ? true : false}
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                Country
              </p>
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="h-12 w-full px-5 invert text-[#1b1b1b] text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-[#a74282] items-center rounded-[12px] bg-transparent"
                value={formData.country}
                onChange={handleChange}
                readOnly={vtype === "view" ? true : false}
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                City
              </p>
              <input
                type="text"
                name="city"
                placeholder="City"
                className="h-12 w-full px-5 invert text-[#1b1b1b] text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-[#a74282] items-center rounded-[12px] bg-transparent"
                value={formData.city}
                onChange={handleChange}
                readOnly={vtype === "view" ? true : false}
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                Telegram
              </p>
              <input
                type="text"
                name="telegram"
                placeholder="Telegram"
                className="h-12 w-full px-5 invert text-[#1b1b1b] text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-[#a74282] items-center rounded-[12px] bg-transparent"
                value={formData.telegram}
                onChange={handleChange}
                readOnly={vtype === "view" ? true : false}
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                Phone
              </p>
              <input
                type="Phone"
                name="phone"
                placeholder="Phone"
                className="h-12 w-full px-5 invert text-[#1b1b1b] text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-[#a74282] items-center rounded-[12px] bg-transparent"
                value={formData.phone}
                onChange={handleChange}
                readOnly={vtype === "view" ? true : false}
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                Email
              </p>
              <input
                type="Email"
                name="email"
                placeholder="Email"
                className="h-12 w-full px-5 invert text-[#1b1b1b] text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-[#a74282] items-center rounded-[12px] bg-transparent"
                value={formData.email}
                onChange={handleChange}
                readOnly={vtype === "view" ? true : false}
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                Wallet
              </p>
              <input
                type="text"
                name="wallet"
                placeholder="Wallet"
                className="h-12 w-full px-5 invert text-[#1b1b1b] text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-[#a74282] items-center rounded-[12px] bg-transparent"
                value={formData.wallet}
                onChange={handleChange}
                readOnly={vtype === "view" ? true : false}
              />
            </div>
            <div className="lg:col-start-1 lg:col-end-4 flex flex-col w-full gap-3">
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] leading-[24px] font-Poppins text-whiteTextColor">
                Organizer id
              </p>
              <input
                type="text"
                name="organizerId"
                placeholder="OrganizerId"
                value={formData.organizerId}
                className="h-12 w-full px-5 invert text-[#1b1b1b] text-[24px] sm:text-[20px] xs:text-[16px] leading-[24px] ring-2 ring-inset ring-[#a74282] items-center rounded-[12px] bg-transparent"
                readOnly={true}
              />
            </div>
          </div>
        </div>
        {vtype !== "view" && (
          <div className="flex flex-col justify-center items-center py-4">
            <div className="flex w-full py-4 justify-center items-center">
              <button
                className="w-[184px] py-4 px-6 xs:px-2 rounded-[90px] bg-greenColor flex justify-center items-center text-[16px] font-bold color-dark hover:bg-[#8ed6a9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6e6d2]"
                onClick={handleSubmit}
                disabled={isPending}
              >
                {vtype !== "edit" ? "Add Organizer" : "Update Organizer"}
              </button>
            </div>
            <div className="flex w-full py-4 justify-center items-center">
              <button
                className="w-[184px] py-4 px-6 xs:px-2 rounded-[90px] bg-transparent flex justify-center items-center text-[16px] font-bold text-grayTextColor hover:bg-[#252b3b] active:bg-[#232e3b]"
                onClick={handleCancel}
              >
                CANCEL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddOrganizers;
