import dateFormat from "dateformat";
import Image from "next/image";

export default function Cardpre({
  eventname,
  logo,
  country,
  city,
  www,
  date,
  offerdate,
  offerlocaltime,
  type,
  on_offline,
  gen_invvalt,
}: any) {
  return (
    <div className="w-full flex sm:flex-col items-start sm:items-center px-6 py-6 xs:px-4 gap-x-8 sm:gap-y-8 rounded-3xl bg-grayBackgroundColor">
      <Image
        src={
          logo
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${logo}`
            : "/assets/img/VALT_BG.png"
        }
        width={168}
        height={168}
        className="w-full h-auto max-w-[168px] max-h-[168px] lg:block"
        alt="VALT_BG"
      ></Image>
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row flex-wrap gap-4">
          <div className="px-2 rounded bg-pinkColor font-bold text-lg text-white">
            <span className="lg:block sm:block md:text-[14px] sm:text-[12px] xs:text-[10px]">
              {dateFormat(offerdate, "mmmm dS")} {offerlocaltime}
            </span>
          </div>
          <div className="px-2 rounded border border-yellowColor font-bold text-lg md:text-[14px] sm:text-[12px] xs:text-[10px] text-yellowColor">
            {type}
          </div>
          {/* <div className="px-2 rounded border border-redColor font-bold text-lg text-lg md:text-[14px] sm:text-[12px] xs:text-[10px] text-redColor">
            {on_offline}
          </div> */}
        </div>

        <div className="text-3xl sm:text-[18px] xs:text-[14px] text-grayWhiteColor font-semibold lg:block">
          {eventname}
        </div>

        <div className="text-lg sm:text-[14px] xs:text-[12px] font-normal text-grayColor lg:block">
          {city} - {country}
        </div>

        <a href={www} className="text-2xl sm:text-[12px] font-normal text-blueTextColor">
          {www}
        </a>
      </div>
    </div>
  );
}
