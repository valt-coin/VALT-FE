import { useState, useEffect } from "react";
import axios from "axios";

const Reportcontent = () => {
  const [orgData, setOrgData] = useState([]);

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
        events_count: item.events.length,
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
    setOrgData(newData);
  };

  useEffect(() => {
    getAllOrganizers();
  }, []);

  return (
    <div className="w-full flex flex-col text-[#777E90] xs:px-4 sm:px-8 md:px-16 lg:px-40 my-4">
      <div className="flex w-full">
        <div className="w-full justify-normal items-start my-4 rounded-3xl">
          <div className="w-full flex-wrap sm:px-[16px] flex lg:flex-row sm:flex-col p-6 gap-x-8 sm:gap-y-8 rounded-3xl bg-darkgrayBackgroundColor justify-between">
            <div className="flex flex-col pr-48">
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Organizers:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  {orgData.length}
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Countris:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  {orgData.length}
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Cities:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  {orgData.length}
                </p>
              </div>
            </div>
            <div className="flex flex-col pr-48">
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Events:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  {orgData.reduce((acc: number, item: any) => acc + item.events_count, 0)}
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Not active:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  {orgData.reduce((acc: number, item: any) => acc + item.inactive_count, 0)}
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Active:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  {orgData.reduce((acc: number, item: any) => acc + item.active_count, 0)}
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <p className="block text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Finished:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  {orgData.reduce((acc: number, item: any) => acc + item.finished_count, 0)}
                </p>
              </div>
            </div>
            <div className="flex flex-col pr-48">
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  $VALT:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  0
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Project wallet:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  0
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Investors wallets:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  0
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Organisers wallets:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  0
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Bounty wallets:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  0
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Airdrop wallets:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  0
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Founders wallets:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  0
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Staff wallets:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  0
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-grayColor">
                  Advisors wallets:{" "}
                </p>
                <p className="text-[24px] sm:text-[18px] xs:text-[14px] leading-[40px] font-bold font-poppins text-whiteTextColor">
                  {" "}
                  0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportcontent;
