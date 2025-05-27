import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

const BackHeader = () => {
  const router = useRouter();

  const handleGoBack = () => {
    // Navigate to the previous page
    router.back();
  };
  return (
    <div className="w-full flex flex-row xs:px-4 sm:px-8 md:px-16 lg:px-40 pb-4 lg:pt-8 items-center">
      <button
        onClick={handleGoBack}
        className="flex flex-row items-center justify-center"
      >
        <ChevronLeftIcon className="w-8 h-8 xs:w-6 xs:h-6 text-grayColor"></ChevronLeftIcon>
        <p className="text-greenColor text-2xl sm:text-xl xs:text-sm font-bold fontFamily-Poppins">
          Back
        </p>
      </button>
    </div>
  );
};

export default BackHeader;
