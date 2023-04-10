import { CuadroWithPrecio, CuadroWithPrecioPrincipal } from "../../components/Suscripciones/CuadroPrecio"

const HazteSocio = () => {
    return (
        <>
            <div className="max-w-screen-lg mx-auto inset-x-0 flex flex-col items-center my-5">
                <h4 className="text-textGray text-xs font-bold">DIARIO CIVITAS</h4>
                <h2 className="text-4xl py-1 font-bold text-textBlack">Hazte socio , hazte socia</h2>
                <h4 className="text-textGray text-sm">Ayúdanos a construir una sociedad mejor informada</h4>

                <section className="md:py-8 px-5 grid grid-cols-3  gap-10">
                    <CuadroWithPrecio
                        title={"Cuota anual"}
                        price={"80$"}
                        infoButton={"Hazte socio/a"}
                        infoButtonPlus={"40€/mes con G+"}
                        info={"50% de descuento el primer año"}
                    />

                    <CuadroWithPrecioPrincipal
                        titleBlanco={"¡UNIDADES LIMITADAS!"}
                        title={"Cuota anual + plus"}
                        price={"90$"}
                        infoButton={"Hazte socio/a"}
                        infotitle={"TE REGALAMOS DOS BILLETES"}
                        infoSubtitle={"para viajar en AVE, Alvia, Intercity o Euromed válidos durante 1 año"}
                    />

                    <CuadroWithPrecio
                        title={"Cuota mensual"}
                        price={"8$"}
                        infoButton={"Hazte socio/a"}
                        infoButtonPlus={"4€/mes con G+"}
                        info={"50% de descuento el primer año"}
                    />
                </section>

            </div>
        </>
    )
}

export default HazteSocio