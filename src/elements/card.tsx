import { useRouter } from "next/navigation";
import dateFormat from "dateformat";
import Image from "next/image";

export default function Card({
  _id,
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
  const router = useRouter();

  const handleClick = () => {
    router.push(`/detail/${_id}`);
  };
  return (
    <div className="flex w-full">
      <div
        className="w-full justify-normal items-start my-4 rounded-3xl focus:outline-none focus:ring focus:ring-greenColor cursor-pointer"
        onClick={handleClick}
      >
        <div
          className="w-full sm:px-[16px] flex md:flex-col sm:flex-col p-6 gap-x-8 sm:gap-y-8 rounded-3xl bg-darkgrayBackgroundColor justify-between 
                hover:bg-[#252b3b] active:bg-[#232e3b] "
        >
          <div className="flex md:flex-row sm:flex-col xs:flex-col sm:items-center gap-x-8 sm:gap-y-8">
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
            <div className="flex flex-col gap-y-3 justify-start items-start">
              <div className="flex flex-wrap gap-4">
                <div className="px-2 rounded bg-pinkColor font-bold text-lg text-white min-w-[88px]">
                  <span className="text-lg md:text-[14px] sm:text-[12px] xs:text-[10px]">
                    {dateFormat(offerdate, "mmmm dS")} {offerlocaltime}
                  </span>
                </div>
                <div className="px-2 rounded border border-yellowColor font-bold text-lg md:text-[14px] sm:text-[12px] xs:text-[10px] text-yellowColor">
                  {type}
                </div>
                <div className="px-2 rounded border border-redColor font-bold text-lg md:text-[14px] sm:text-[12px] xs:text-[10px] text-redColor">
                  {on_offline}
                </div>
              </div>
              <div className="text-3xl sm:text-[18px] xs:text-[14px] text-grayWhiteColor font-semibold">
                {eventname}
              </div>
              <div className="text-2xl sm:text-[14px] xs:text-[12px] font-normal text-grayColor">
                {city} - {country}
              </div>
              <a
                href={www}
                className="text-[22px] sm:text-[12px] font-normal text-blueTextColor"
              >
                {www}
              </a>
            </div>
          </div>
          <button
            className="bg-grayBackgroundColor flex rounded-3xl lg:w-[370px] w-full flex-col pt-[42px] md:mt-8 hover:bg-darkgrayBackgroundColor active:bg-[#252b3b]"
            onClick={handleClick}
          >
            <div className="w-full flex flex-row items-center justify-center rounded-3xl bg-transparent gap-4">
              <Image
                src="/assets/img/wallet_icon.png"
                width={56}
                height={56}
                className="w-[56px] h-[56px]"
                alt="wallet_icon"
              ></Image>
              <div className="text-[38px] font-semibold text-greenColor">
                {gen_invvalt}
              </div>
            </div>
            <div className="w-full flex items-center justify-center py-6">
              <p className="text-lg sm:text-[14px] font-bold text-white">
                BUY $VALT GET FREE INVITE
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
