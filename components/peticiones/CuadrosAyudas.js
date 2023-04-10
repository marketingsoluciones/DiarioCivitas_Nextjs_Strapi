export const CuadroAyudaSmall = ({ titulo1, ejm1, no1, titulo2, ejm2, no2, titulo3, ejm3, }) => {
    return (<>
        <div className="bg-bgCuadroAyudas w-3/5 p-10 mb-10 rounded-lg">
            <div className="gap-2 flex flex-col">
                <h2 className="font-bold">{titulo1}</h2>
                <span className="text-sm">{ejm1}</span>
                <span className="text-sm">{no1}</span>
            </div>
            <div className="gap-2 flex flex-col mt-3">
                <h2 className="font-bold">{titulo2}</h2>
                <span className="text-sm">{ejm2}</span>
                <span className="text-sm">{no2}</span>
            </div>
            <div className="gap-2 flex flex-col mt-3">
                <h2 className="font-bold">{titulo3}</h2>
                <span className="text-sm">{ejm3}</span>
            </div>
        </div>
    </>)
}

export const CuadroAyudaMedium = ({ titulo1, info1,  titulo2, info2, titulo3, info3  }) => {
    return (<>
        <div className="bg-bgCuadroAyudas w-3/5 p-10 mb-10 rounded-lg">
            <div className="gap-2 flex flex-col">
                <h2 className="font-bold">{titulo1}</h2>
                <span className="text-sm">{info1}</span>
            </div>
            <div className="gap-2 flex flex-col mt-3">
                <h2 className="font-bold">{titulo2}</h2>
                <span className="text-sm">{info2}</span>
            </div>
            <div className="gap-2 flex flex-col mt-3">
                <h2 className="font-bold">{titulo3}</h2>
                <span className="text-sm">{info3}</span>

            </div>
        </div>
    </>)
}

export const CuadroAyudaBig = ({ titulo1, info1, titulo2, info2, titulo3, info3, titulo4, info4, titulo5, info5, }) => {
    return (<>
        <div className="bg-bgCuadroAyudas w-3/5 p-10 mb-10 rounded-lg ">
            <div className="gap-2 flex flex-col">
                <h2 className="font-bold">{titulo1}</h2>
                <span className="text-sm">{info1}</span>
            </div>
            <div className="gap-2 flex flex-col mt-5">
                <h2 className="font-bold">{titulo2}</h2>
                <span className="text-sm">{info2}</span>
            </div>
            <div className="gap-2 flex flex-col mt-5">
                <h2 className="font-bold">{titulo3}</h2>
                <span className="text-sm">{info3}</span>
            </div>
            <div className="gap-2 flex flex-col mt-5">
                <h2 className="font-bold">{titulo4}</h2>
                <span className="text-sm">{info4}</span>
            </div>
            <div className="gap-2 flex flex-col mt-5">
                <h2 className="font-bold">{titulo5}</h2>
                <span className="text-sm">{info5}</span>
            </div>
        </div>
    </>)
}