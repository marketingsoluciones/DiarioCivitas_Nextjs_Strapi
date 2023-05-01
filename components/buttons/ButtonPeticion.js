export const BtnPeticion = () => {
  return (
    <div className="bg-[#e8312a] rounded-[100px] pt-[19px] pr-0.5 pb-[19px] pl-0.5 flex flex-row gap-2.5 items-center justify-start shrink-0 w-[162px] h-[31px] relative overflow-hidden">
      <div className="bg-[#ffffff] rounded-[100px] shrink-0 w-[29px] h-7 relative overflow-hidden">
        <div
          className="text-red-600 text-left absolute left-2.5 top-[4.5px] flex items-center justify-start"
          style={{ font: "700 16px 'Roboto', sans-serif" }}
        >
          +
        </div>
      </div>

      <div
        className="text-[#ffffff] text-left relative flex items-center justify-start font-display"
        /* style={{ font: "700 16px 'Roboto', sans-serif" }} */
      >
        Nueva petición
      </div>
    </div>
  );
};
