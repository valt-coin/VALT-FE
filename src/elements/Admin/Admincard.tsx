import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import dateFormat from "dateformat";
import Image from "next/image";

interface AdminCardProps {
  _id: string;
  eventname: string;
  logo?: string;
  country: string;
  city: string;
  www?: string;
  offerdate: string;
  offerlocaltime: string;
  type: string;
  on_offline: string;
  gen_invvalt: string;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const AdminCard: React.FC<AdminCardProps> = ({
  _id,
  eventname,
  logo,
  country,
  city,
  www,
  offerdate,
  offerlocaltime,
  type,
  on_offline,
  gen_invvalt,

  onView,
  onEdit,
  onDelete,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex w-full">
      <button className="w-full justify-normal items-start my-4 rounded-3xl focus:outline-none focus:ring focus:ring-greenColor">
        <div className="w-full sm:px-[16px] flex sm:flex-col p-6 gap-x-8 sm:gap-y-8 rounded-3xl bg-darkgrayBackgroundColor justify-between hover:bg-[#252b3b] active:bg-[#232e3b]">
          <div className="flex flex-row sm:flex-col sm:items-center gap-x-8 sm:gap-y-8">
            {/* <Image src='/assets/img/section1_logo.png' className='w-[168px] h-[168px] hidden lg:block' alt="VALT_BG"></Image> */}
            <Image
              src={
                logo
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${logo}`
                  : "/assets/img/VALT_BG.png"
              }
              width={168}
              height={168}
              className="w-full h-auto max-w-[168px] max-h-[168px] block"
              alt="VALT_BG"
            ></Image>
            <div className="flex flex-col gap-y-3 justify-start items-start">
              <div className="flex flex-wrap gap-4">
                {offerdate && (
                  <div className="px-2 rounded bg-pinkColor font-bold text-lg text-white min-w-[88px]">
                    <span className="text-lg sm:text-[12px] xs:text-[10px]">
                      {dateFormat(offerdate, "mmmm dS")} {offerlocaltime}
                    </span>
                  </div>
                )}
                {type && (
                  <div className="px-2 rounded border border-yellowColor font-bold text-lg sm:text-[12px] xs:text-[10px] text-yellowColor">
                    {type}
                  </div>
                )}
                {on_offline && (
                  <div className="px-2 rounded border border-redColor font-bold text-lg sm:text-[12px] xs:text-[10px] text-redColor">
                    {on_offline}
                  </div>
                )}
              </div>

              <div className="text-4xl xs:text-[16px] sm:text-[18px] xs:text-[14px] leading-[36px] text-grayWhiteColor font-semibold lg:block">
                {eventname}
              </div>

              <div className="text-[26px] sm:text-[14px] xs:text-[12px] leading-[24px] font-normal text-grayColor lg:block">
                {city} - {country}
              </div>

              <a
                href={www}
                className="text-[22px] sm:text-[12px] leading-[24px] font-normal text-blueTextColor"
              >
                {www}
              </a>
            </div>
          </div>
          <div className="bg-transparent flex rounded-3xl w-8 sm:w-full flex-col sm:flex-row justify-between sm:justify-center sm:gap-x-8">
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
              onClick={() => onDelete(_id)}
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
      </button>
    </div>
  );
};

export default AdminCard;
