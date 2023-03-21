const TagCategory = ({ categories }) => {

    return (
        <div className="flex items-center gap-3">
            {categories?.map((item, idx) => {
                return (
                    <Category key={idx} categoryData={item} />
                )
            })}
        </div>
    )
}

export default TagCategory


const Category = ({ categoryData }) => {
    return (
        <div className="bg-green-500 rounded-lg font-body text-xs w-max text-white px-4 py-1 cursor-pointer hover:opacity-90 transition">
            {`${categoryData?.title?.charAt(0)?.toUpperCase()}${categoryData?.title?.slice(1)}`}
        </div>
    )
}

