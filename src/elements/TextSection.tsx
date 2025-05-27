export default function TextSection({ description }: any) {
  const text = `${description}`;

  return (
    text && (
      <div className="w-full justify-between p-8 sm:p-4 rounded-lg bg-darkDarkColor">
        <p className="text-2xl sm:text-[16px] xs:text-[12px] font-normal leading-[30px] text-grayTextColor">
          {text}
        </p>
      </div>
    )
  );
}
