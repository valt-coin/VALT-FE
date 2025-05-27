import React from "react";
import { useRouter } from "next/navigation";

const Reportbar = () => {
  const router = useRouter();
  const Eventbutton2 = () => {
    // Navigate to "/about" when the button is clicked
    router.push("/admin");
  };
  const Organizersbutton2 = () => {
    // Navigate to "/about" when the button is clicked
    router.push("/admin/organizer");
  };
  const Reportbutton2 = () => {
    // Navigate to "/about" when the button is clicked
    router.push("/admin/report");
  };

  return (
    <div className="w-full flex flex-col text-[#777E90]">
      <div className="w-full flex flex-row py-4 justify-center items-center">
      <div className="flex xs:flex-col xs:w-[150px] my-[10px] sm:mt-2 xs:gap-y-2">
          <button
            onClick={Eventbutton2}
            className="block justify-center rounded-[14px] w-[118px] xs:w-full items-center text-graycolor bg-transparent hover:bg-[#58BD7D] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6e6d2]"
          >
            <p className="text-lg xs:text-[14px] font-bold">Events</p>
          </button>
          <button
            onClick={Organizersbutton2}
            className="block justify-center text-graycolor bg-transparent rounded-[14px] w-[150px] xs:w-full items-center hover:bg-[#58BD7D] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6e6d2]"
          >
            <p className="text-lg xs:text-[14px] font-bold ">Organizers</p>
          </button>
          <button
            onClick={Reportbutton2}
            className="block justify-center text-black bg-[#58BD7D] rounded-[14px] w-[110px] xs:w-full items-center hover:bg-[#58BD7D] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6e6d2]"
          >
            <p className="text-lg xs:text-[14px] font-bold ">Reports</p>
          </button>
        </div>
      </div>
      <div className="w-full flex ">
        <div className="w-full flex xs:px-4 sm:px-8 md:px-16 lg:px-40 my-2 md:flex-row sm:flex-col sm:gap-y-[21px]">
          <div className="w-full flex-col font-Poppins flex ">
            <p className="text-[64px] sm:text-[32px] xs:text-[24px] font-bold text-[#FCFCFD]">
              Report
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportbar;
