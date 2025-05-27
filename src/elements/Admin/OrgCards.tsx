import { useState } from "react";
import Image from "next/image";
import { Tooltip } from "react-tooltip";

interface OrgCardProps {
  _id: string;
  organizer: string;
  name: string;
  surname: string;
  country: string;
  city: string;
  telegram: string;
  phone: string;
  email: string;
  wallet: string;
  active: boolean;
  organizerId: string;
  gen_invvalt: string;
  isPending: boolean;
  onActivate: (id: string, active: boolean) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string, wallet: string) => void;
}

const OrgCards: React.FC<OrgCardProps> = ({
  _id,
  organizer,
  name,
  surname,
  country,
  city,
  telegram,
  phone,
  email,
  wallet,
  active,
  organizerId,
  active_count,
  inactive_count,
  finished_count,
  isPending,
  onActivate,
  onView,
  onEdit,
  onDelete,
}: any) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(active);

  return (
    <div className="flex w-full">
      <div className="w-full justify-normal items-start my-4 rounded-3xl">
        <div className="w-full flex flex-col justify-between p-8 xs:px-4 gap-x-8 rounded-3xl bg-darkgrayBackgroundColor hover:bg-[#252b3b] active:bg-[#232e3b cursor-pointer">
          <div className="w-full flex justify-between items-center">
            <div>
              {isEnabled ? (
                <div className="w-[128px] h-[32px] xs:w-[64px] py-[16px] px-[24px] rounded-[4px] bg-greenColor flex justify-center items-center text-[16px] xs:text-[12px] text-mainDark font-bold color-dark">
                  ACTIVE
                </div>
              ) : (
                <div className="w-[128px] h-[32px] xs:w-[64px] py-[16px] px-[24px] rounded-[4px] bg-greenColor flex justify-center items-center text-[16px] xs:text-[12px] text-mainDark font-bold color-dark">
                  INACTIVE
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => {
                  setIsEnabled(!isEnabled);
                  onActivate(_id, !isEnabled);
                }}
                className={`
                  relative inline-flex w-12 h-6 rounded-full transition-colors duration-200 ease-in-out
                  ${
                    isEnabled ? "bg-greenColor" : "bg-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-greenColor`}
              >
                <span
                  className={`inline-block mt-[3.3px] w-[17px] h-[17px] rounded-full bg-white transform transition-transform duration-200 ease-in-out items-center
                      ${isEnabled ? "translate-x-7" : "translate-x-1"}
                      shadow-sm
                  `}
                />
              </button>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col justify-between my-10">
            <div className="flex sm:flex-col flex-row">
              <div className="block w-[229px]">
                <div className="text-[24px] sm:text-[18px] xs:text-[16px] pr-5 leading-[32px] font-bold font-poppins text-whiteTextColor">
                  {organizer}
                </div>
                <div className="text-[20px] sm:text-[16px] xs:text-[12px] pr-5 leading-[32px] font-poppins text-grayColor">
                  {city}, {country}
                </div>
                <div>
                  <a
                    href=""
                    className="text-[20px] sm:text-[16px] xs:text-[12px] pr-5 leading-[32px] font-normal text-blueTextColor"
                  >
                    {telegram}
                  </a>
                </div>
              </div>
              <div className="lg:px-8 md:px-8 sm:pt-8">
                <div className="ext-[24px] sm:text-[18px] xs:text-[16px] leading-[32px] font-bold font-poppins text-whiteTextColor">
                  {name} {surname}
                </div>
                <div>
                  <a
                    href=""
                    className="text-[20px] sm:text-[16px] xs:text-[12px] leading-[32px] font-normal text-blueTextColor"
                  >
                    {phone}
                  </a>
                </div>
                <div>
                  <a
                    href=""
                    className="text-[20px] sm:text-[16px] xs:text-[12px] leading-[32px] font-normal text-blueTextColor"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex pr-[85px] sm:pr-0 xs:pr-[40px] md:pl-[95px] md:pt-[75px] sm:pt-[45px]">
              <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                <div className="sm:block hidden font-bold">Events</div>
                <div className="sm:block hidden"></div>
                <div className="sm:block hidden"></div>
                <div className="sm:block hidden font-bold">$VALT</div>
                <div className="text-[14px] md:text-[12px] sm:text-[10px] leading-[20px] font-bold font-poppins text-grayColor">
                  Not active
                </div>
                <div className="text-[14px] md:text-[12px] sm:text-[10px] leading-[20px] font-bold font-poppins text-grayColor">
                  Active
                </div>
                <div className="text-[14px] md:text-[12px] sm:text-[10px] leading-[20px] font-bold font-poppins text-grayColor">
                  Finished
                </div>
                <div className=""></div>
                <div className="text-[16px] md:text-[14px] sm:text-[12px] leading-[16px] font-bold font-poppins text-whiteTextColor">
                  {inactive_count}
                </div>
                <div className="text-[16px] md:text-[14px] sm:text-[12px] leading-[16px] font-bold font-poppins text-whiteTextColor">
                  {active_count}
                </div>
                <div className="text-[16px] md:text-[14px] sm:text-[12px] leading-[16px] font-bold font-poppins text-whiteTextColor">
                  {finished_count}
                </div>
                <div className="text-[16px] md:text-[14px] sm:text-[12px] leading-[16px] font-bold font-poppins text-whiteTextColor">
                  0
                </div>
                <div className="sm:block hidden font-bold">Total</div>
                <div className="sm:block hidden"></div>
                <div className="sm:block hidden"></div>
                <div className="sm:block hidden"></div>
                <div className="text-[20px] md:text-[16px] sm:text-[12px] leading-[16px] font-bold font-poppins text-whiteTextColor">
                  {inactive_count}
                </div>
                <div className="text-[20px] md:text-[16px] sm:text-[12px] leading-[16px] font-bold font-poppins text-whiteTextColor">
                  {active_count}
                </div>
                <div className="text-[20px] md:text-[16px] sm:text-[12px] leading-[16px] font-bold font-poppins text-whiteTextColor">
                  {finished_count}
                </div>
                <div className="text-[20px] md:text-[16px] sm:text-[12px] leading-[16px] font-bold font-poppins text-whiteTextColor">
                  0
                </div>
                {/* <div className='text-[24px] leading-[32px] font-bold font-poppins text-whiteTextColor'>Not active</div> */}
              </div>
              <div className="relative sm:hidden">
                <div className="absolute right-[400px] md:right-[360px] md:top-[68px] top-[76px] text-[18px] leading-[16px] font-bold font-poppins text-grayColor">
                  Total
                </div>
                <div className="absolute right-[290px] md:right-[250px] top-[-30px] text-[18px] leading-[16px] font-bold font-poppins text-grayColor">
                  Events
                </div>
                <div className="absolute right-[20px] md:right-[10px] top-[-30px] text-[18px] leading-[16px] font-bold font-poppins text-grayColor">
                  $VALT
                </div>
              </div>
            </div>
          </div>
          <div className="bg-transparent flex justify-between max-w-40 sm:max-w-32">
            <div
              data-tooltip-id="my-tooltip"
              data-tooltip-content="View"
              onClick={() => onView(_id)}
            >
              <Image
                width={32}
                height={32}
                src={"/assets/icons/view-show-all-icon.svg"}
                alt="View Icon"
                className="w-8 h-8 sm:w-6 sm:h-6"
              />
            </div>
            <div
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Edit"
              onClick={() => onEdit(_id)}
            >
              <Image
                width={32}
                height={32}
                src={"/assets/icons/edit-document-icon.svg"}
                alt="View Icon"
                className="w-8 h-8 sm:w-6 sm:h-6"
              />
            </div>
            <div
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Delete"
              onClick={() => onDelete(_id, wallet)}
              className={
                isPending ? "pointer-events-none" : "pointer-events-auto"
              }
            >
              <Image
                width={32}
                height={32}
                src={"/assets/icons/text-document-remove-icon.svg"}
                alt="View Icon"
                className="w-8 h-8 sm:w-6 sm:h-6"
              />
            </div>
            <Tooltip id="my-tooltip" place="top" content="This is a tooltip" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgCards;
