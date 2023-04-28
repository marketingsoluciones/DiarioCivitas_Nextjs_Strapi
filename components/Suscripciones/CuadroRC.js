export const CuadroRedactor = () => {
    return (
        <>
            <div className="break-words  flex flex-col items-center px-4 py-4 ">
                <h2 className="font-bold text-xl text-textBlueg">REDACTOR</h2>
                <span className="font-semibold mt-2">
                Publica tu información directamente en diario civitas.
                </span>
                <sapn className="font-semibold mt-1">
                Tendrás tu propio perfil de redactor, con tus lectores y tus noticias.
                </sapn>
                <sapn className="font-semibold mt-1">
                En diarios civitas podrás contar tu noticia, tu verdad y tu punto de vista sobre la actualidad.
                </sapn>

                <button className="bg-textBlueg text-white px-3 py-4 mt-2 font-semibold rounded-md text-sm">QUIERO SER REDACTOR</button>
            </div>
        </>
    )
}

export const CuadroColaborador = () => {
    return (
        <>
            <div className="flex flex-col items-center px-4 py-4 ">
                <h2 className="font-bold text-xl text-red-600 ">COLABORADOR</h2>
                <span className="font-semibold mt-2">
                    Si ya dispones de un blog o una web donde publicas tus articulos, también puedes publicar
                    automáticamente esos mismos artículos en diarios civitas
                </span>
                <sapn className="font-semibold mt-1">
                    Asi podrás difundir tu punto de vista a toda la audiencia de diarios civitas
                </sapn>

                <button className="bg-textBlueg hover:bg-blue-200* text-white px-3 py-4 mt-9 font-semibold rounded-md text-sm ">QUIERO SER COLABORADOR</button>
            </div>
        </>
    )

}