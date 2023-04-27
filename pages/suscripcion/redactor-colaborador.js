import { CuadroColaborador, CuadroRedactor } from "../../components/Suscripciones/CuadroRC"

const RedactorColaborador = () => {
    return (
        <>
            <div className="max-w-screen-lg mx-auto inset-x-0 flex flex-col items-center my-5 text-center lg:text-left">
                <h1 className="font-sans font-bold text-4xl text-textBlueg"><span className="text-black">TÚ ESCRIBES,</span> TU HACES LA NOTICIA</h1>
                <h3 className="font-semibold mt-2">LA INFORMACION EN DIARIOS CIVITAS LA REDACTAMOS ENTRE TODOS,</h3>
                <h3 className="font-semibold">LO QUE ES ACTUALIDAD LO DECIMOS ENTRE TODOS</h3>
                <h3 className="font-bold my-6">ELIJE TU FORMA DE ESTAR EN DIARIOS CIVITAS</h3>

                <div className="grid justify-content-center items-center grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                    <div >
                        <img alt="redactor.png" src="/redactor.png" />
                    </div>
                    <div className="bg-white m-1 shadow-xl">
                        <CuadroRedactor/>
                    </div>
                    <div className="bg-white m-1 shadow-xl">
                        <CuadroColaborador/>
            
                    </div>
                    <div><img alt="colaborador.png" src="/colaborador.png" /></div>
                </div>
            </div>
        </>
    )
}

export default RedactorColaborador