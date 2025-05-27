import dateFormat from "dateformat";
import Image from "next/image";

export default function Pchase_Con({
  eventname,
  logo,
  country,
  city,
  www,
  date,
  offerdate,
  type,
  on_offline,
  gen_invvalt,
}: any) {
  return (
    <div className="w-full flex md:flex-row sm:flex-col p-6 sm:p-0 gap-x-8 sm:gap-y-8 rounded-3xl justify-center items-center">
      <Image
        src={
          logo
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${logo}`
            : "/assets/img/VALT_BG.png"
        }
        width={168}
        height={168}
        className="w-full h-full max-w-[168px] max-h-[168px] lg:block"
        alt="VALT_BG"
      ></Image>
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row flex-wrap gap-4">
          <div className="px-2 rounded bg-pinkColor text-lg sm:text-[12px] text-white min-w-[88px]">
            <span className="sm:block md:block md:text-[14px] sm:text-[12px] xs:text-[10px]">
              {dateFormat(date, "mmmm dS")}-{dateFormat(offerdate, "dS")}
            </span>
          </div>
          <div className="px-2 rounded border border-yellowColor text-lg sm:text-[12px] xs:text-[10px] text-yellowColor">
            {type}
          </div>
        </div>

        <div className="text-4xl sm:text-[20px] xs:text-[14px] leading-[36px] text-grayWhiteColor font-semibold lg:block">
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
  );
}