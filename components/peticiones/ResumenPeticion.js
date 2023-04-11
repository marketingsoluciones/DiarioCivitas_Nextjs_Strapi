import { Markup } from "interweave";
import Image from "next/dist/client/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import { Firmas } from "./Firmas";


export const ResumenPeticion = ({ title, destinatario, problema, imagen }) => {

    const settings = {
        arrows: true,
        infinite: false,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    return (
        <>
            <div className="flex flex-col items-center my-10">

                <h3 className="w-3/4 text-center font-bold text-4xl">
                    {title}
                </h3>

                <div className="px-20 mt-5 col-span-4 w-full grid grid-cols-4 gap-10">
                    <div className="col-span-3 ">
                        <div className="rounded-xl mb-4">
                            <Slider {...settings} >
                                {imagen.map((item, idx) => {
                                    return (
                                        <Image
                                            key={item._id}
                                            alt={item._id}
                                            src={item.imagen}
                                            height="500px"
                                            width="1000px"
                                        />
                                    )
                                })}
                            </Slider>
                        </div>
                        <Markup content={problema} />
                    </div>
                    <div className="col-span-1">
                        <Firmas />
                    </div>
                </div>

                <div className="px-20 w-full text-xs italic mt-3">
                    {destinatario}
                </div>
                <button className="bg-blueFull py-2 rounded-lg mt-2 text-center text-white w-1/4 items-end justify-self-end font-bold">Publicar Peticion</button>
            </div>

        </>
    )
}