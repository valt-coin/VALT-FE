import { useRouter } from "next/navigation";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const OrganizerFooter = () => {
  const router = useRouter();

  const handleAddOrganizer = () => {
    // Navigate to "/about" when the button is clicked
    router.push("/admin/addorganizer");
  };
  const handlechangehome = () => {
    // Navigate to "/about" when the button is clicked
    router.push("/admin");
  };
  return (
    <div className="w-full flex flex-col xs:pt-4 sm:pt-8 md:pt-14 lg:pt-20">
      <div className="w-full border border-grayBackgroundColor border-x-[0px] text-gray-500 ">
        <div className="w-full md:py-[39px] lg:py-[39px] sm:py-[18px] xs:px-4 sm:px-8 md:px-16 lg:px-40 flex md:flex-row  sm:flex-col sm:items-center sm:gap-y-[21px] justify-between ">
          <div className="flex flex-row sm:flex-col gap-20 sm:gap-4 items-center">
            <button onClick={handlechangehome}>
              <Image
                src="/assets/img/Logo.png"
                width={60}
                height={60}
                className="w-[60px] h-[60px] xs:w-[40px] xs:h-[40px]"
                alt="logo"
              ></Image>
            </button>
            <div className="flex flex-row flex-wrap justify-center gap-x-[36px] gap-y-4 text-[18px] xs:text-[14px]">
              <a
                href="https://docs.google.com/document/d/1Ju1jzMTOQz5TyXL0XiABg2DX7lxupinukfKCapHXIes/edit?usp=sharing"
                className="flex"
              >
                <p className="font-bold text-grayColor">FAQ</p>
              </a>
              <a
                href="https://docs.google.com/document/d/16aMZRjv1egrJZf_IAsP2FU9aCrTPYpzuvCxdbFW1vX8/edit?usp=sharing"
                className="flex"
              >
                <p className="font-bold text-grayColor">Support</p>
              </a>
              <a
                href="https://docs.google.com/document/d/1FZCwl_MMxketjOQjOEgxMb-M5JH40_1zndPfJdAT2N8/edit?usp=sharing"
                className="flex"
              >
                <p className="font-bold text-grayColor">Contact</p>
              </a>
              <a
                href="https://docs.google.com/document/d/171sK5xIMaeI8SzczLysQTrKwGDYyvqZi3wbCPjEp1vs/edit?usp=sharing"
                className="flex"
              >
                <p className="font-bold text-grayColor">About</p>
              </a>
            </div>
          </div>
          <button
            onClick={handleAddOrganizer}
            className="w-[160px] h-[60px] xs:w-[140px] xs:h-[40px] flex justify-center items-center border-[2px] border-grayColor rounded-full text-white text-4 xs:text-[14px] font-bold cursor-pointer hover:bg-[#252b3b] active:bg-[#232e3b]"
          >
            Add Organizer
          </button>
        </div>
      </div>

      <div className="flex sm:flex-col justify-between items-center xs:px-4 sm:px-8 md:px-16 lg:px-40 py-6 mb-4 sm:gap-6">
        <div className="w-full flex sm:flex-col-reverse sm:items-center gap-20 sm:gap-4 md:gap-11">
        <p className="text-4 xs:text-[12px] font-normal text-grayColor">
            © 2024 Tavo Limited, Hong Kong
          </p>
          <a
            href="https://docs.google.com/document/d/1vbquA4ccboapW-FY0y7bRWYrArI5NMCNmsdUUdYEdNA/edit?usp=sharing"
            className="text-4 xs:text-[12px] font-normal text-grayColor"
          >
            Terms and conditions
          </a>
          <a
            href="https://docs.google.com/document/d/1cCOg1z8-5mg9uJxBemO-7Xyp45uYALtCctCuXiRJgfc/edit?usp=sharing"
            className="text-4 xs:text-[12px] font-normal text-grayColor"
          >
            Privacy policy
          </a>
        </div>
        <div className="flex justify-start items-center gap-6">
          <a href="https://t.me/valt_coin">
            <FaTelegramPlane className="text-[#88816f] invert w-7 h-7 xs:w-5 xs:h-5"></FaTelegramPlane>
          </a>
          <a href="https://www.linkedin.com/company/valt-coin/">
            <FaLinkedin className="text-[#88816f] invert w-7 h-7 xs:w-5 xs:h-5"></FaLinkedin>
          </a>
          <a href="https://x.com/valt_coin">
            <FaXTwitter className="text-[#88816f] invert w-7 h-7 xs:w-5 xs:h-5"></FaXTwitter>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrganizerFooter;
