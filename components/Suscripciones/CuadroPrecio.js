export const CuadroWithPrecio = ({ title, price, infoButton, infoButtonPlus, info }) => {
    return (
        <>
            <div className="bg-white rounded-md flex flex-col items-center py-7 px-5 gap-4">
                <h3 className="text-2xl text-textColorTitle font-bold ">{title}</h3>
                <h3 className="text-3xl text-textColorTitle font-bold">{price}</h3>
                <button className="text-borderButtonColor cursor-pointer border-2 border-borderButtonColor rounded-md py-2 w-full flex justify-center font-semibold" >{infoButton}</button>
                <span>O</span>
                <button className="text-borderButtonColor cursor-pointer border-2 border-borderButtonColor rounded-md py-2 w-full flex justify-center font-semibold">{infoButtonPlus}</button>
                <h3 className="text-sm mt-7 text-textColorInfo">{info}</h3>
            </div>
        </>
    )
} 

export const CuadroWithPrecioPrincipal = ({ title, titleBlanco, price, infoButton, infotitle, infoSubtitle }) => {
    return (
        <>
            <div className=" shadow-lg bg-white rounded-md flex flex-col items-center py-7 px-5 gap-4">
                <span className="text-xs text-textColorInfo ">{ titleBlanco }</span>
                <h3 className="text-2xl text-textColorTitle  font-bold ">{title}</h3>
                <h3 className="text-3xl text-textColorTitle font-bold">{price}</h3>
                <button className="font-semibold bg-borderButtonColor cursor-pointer border-2 border-borderButtonColor rounded-md py-2 w-full flex justify-center text-white shadow-lg shadow-borderButtonColor " >{infoButton}</button>
                <span className="my-3">O</span>
                <h3 className="text-sm  text-textColorInfo">{infotitle}</h3>
                <p className="text-sm text-textColorInfo text-center">{infoSubtitle}</p>
            </div>
        </>
    )
} 