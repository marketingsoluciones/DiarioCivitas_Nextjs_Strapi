export const ButtonBorder = ({ icon, text, onClick }) => {
    return (
        <>
            <div className="rounded-lg border-solid border-gray-600 border-1 px-[5px] py-[2px]  flex flex-row gap-2 items-center justify-end relative cursor-pointer">
                {icon}
                <div
                    className="text-grey-800 text-xs"
                    onClick={onClick}
                >
                    {text}
                </div>
            </div>
        </>
    )
}