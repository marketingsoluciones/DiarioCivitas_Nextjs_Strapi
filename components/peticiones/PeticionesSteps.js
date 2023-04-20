import { CheckIcon } from "../icons"

export const Steps = ({ step }) => {

    return (
        <>
            <div className="flex gap-8 mb-4 ">
                <div className="  flex justify-center items-center gap-2">

                    {(() => {
                        if (step === 0) {
                            return (
                                <div className={`p-4 w-14 ${step >= 0 ? "bg-blueFull" : "text-blueClaro"} rounded-full text-center text-white  font-bold `}>
                                    1
                                </div>
                            )

                        } else if (step >= 0) {
                            return (
                                <div className={`p-4 w-14 ${step >= 0 ? "bg-blueFull" : "text-blueClaro"} rounded-full text-center text-white  font-bold `}>
                                    <CheckIcon />
                                </div>
                            )
                        }
                    })()}

                    <span className={`${step >= 0 ? "text-blueFull" : "text-blueClaro"} font-bold`}>
                        corto y directo
                    </span>
                </div>
                <div className="flex justify-center items-center gap-2 ">
                    {(() => {
                        if (step < 1) {
                            return (
                                <div className={`p-4 w-14 text-blueClaro rounded-full text-center text-white  font-bold `}>
                                    2
                                </div>
                            )
                        }
                        else if (step === 1) {
                            return (
                                <div className={`p-4 w-14 ${step >= 0 ? "bg-blueFull" : "text-blueClaro"} rounded-full text-center text-white  font-bold `}>
                                    2
                                </div>
                            )

                        } else if (step >= 1) {
                            return (
                                <div className={`p-4 w-14 ${step >= 0 ? "bg-blueFull" : "text-blueClaro"} rounded-full text-center text-white  font-bold `}>
                                    <CheckIcon />
                                </div>
                            )
                        }
                    })()}

                    <span className={`${step >= 1 ? "text-blueFull" : "text-blueClaro"} font-bold`}>
                        destinatario
                    </span>
                </div>
                <div className="flex justify-center items-center gap-2 ">

                    {(() => {
                        if (step < 2) {
                            return (
                                <div className={`p-4 w-14 text-blueClaro rounded-full text-center text-white  font-bold `}>
                                    3
                                </div>
                            )
                        }
                        else if (step === 2) {
                            return (
                                <div className={`p-4 w-14 ${step >= 0 ? "bg-blueFull" : "text-blueClaro"} rounded-full text-center text-white  font-bold `}>
                                    3
                                </div>
                            )
                        }

                        else if (step >= 2) {
                            return (
                                <div className={`p-4 w-14 ${step >= 0 ? "bg-blueFull" : "text-blueClaro"} rounded-full text-center text-white  font-bold `}>
                                    <CheckIcon />
                                </div>
                            )
                        }
                    })()}

                    <span className={`${step >= 2 ? "text-blueFull" : "text-blueClaro"} font-bold`}>
                        Resuelve un problema
                    </span>
                </div>
                <div className="flex justify-center items-center gap-2 ">

                    {(() => {
                        if (step < 3) {
                            return (
                                <div className={`p-4 w-14 text-blueClaro rounded-full text-center text-white  font-bold `}>
                                    4
                                </div>
                            )
                        }
                        else if (step === 3) {
                            return (
                                <div className={`p-4 w-14 ${step >= 0 ? "bg-blueFull" : "text-blueClaro"} rounded-full text-center text-white  font-bold `}>
                                    4
                                </div>
                            )
                        }

                        else if (step >= 3) {
                            return (
                                <div className={`p-4 w-14 ${step >= 0 ? "bg-blueFull" : "text-blueClaro"} rounded-full text-center text-white  font-bold `}>
                                    <CheckIcon />
                                </div>
                            )
                        }
                    })()}

                    <span className={`${step >= 3 ? "text-blueFull" : "text-blueClaro"} font-bold`}>
                    Recursos
                    </span>
                </div>

            </div>
        </>
    )
}