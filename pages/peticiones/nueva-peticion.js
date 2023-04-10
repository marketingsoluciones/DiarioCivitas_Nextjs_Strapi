import { Form, Formik, FormikConfig, FormikValues, useFormikContext } from "formik";
import { CrearTitulo } from "../../components/peticiones/CrearTitulo"
import { ExplicaProblema } from "../../components/peticiones/ExplicaProblema"
import { Steps } from "../../components/peticiones/PeticionesSteps"
import { EscogeDestinatario } from "../../components/peticiones/Destinatario"
import { CargarImg } from "../../components/peticiones/CargarImg"
import { ResumenPeticion } from "../../components/peticiones/ResumenPeticion";
import { useState } from "react"
import { flushSync } from "react-dom";

const CrearPeticion = () => {

    const [step, setStep] = useState(0)
    const [title, setTitle] = useState("")
    const [destinatario,setDestinatario] = useState("")
    const [problema, setProblema] = useState("")
    const [imgen, setImagen] = useState([])
    const [ data, setData] = useState(false)

    console.log(title,destinatario,problema,imgen)

    const onClick = () => {
        setStep(step + 1)
    }

    function handleSubmit () {
        if (step === 0) {
            if (title === '' || title.length <= 1) {
                setData("true")
              } else {
                setData("false")
                setStep(step + 1);
              }
        } else if (step === 1) {
            if (destinatario === '' || destinatario.length <= 1) {
                setData("true")

              } else {
                setData("false")

                setStep(step + 1);
                
              }
        } else if (step === 2) {
            if (problema === '' || problema.length <= 1) {
                setData("Este campo esta vacio, llena el cuadro que dara a entender tu problema")
              } else {
                setStep(step + 1);
                
              }
        } ;
      }


    const conditionalComponent = () => {
        switch (step) {
            case 0:
                return <CrearTitulo
                    onClick={onClick}
                    title={title}
                    setTitle={setTitle}
                    data={data}
                />;
            case 1:
                return <EscogeDestinatario
                    onClick={onClick}
                    destinatario={destinatario}
                    setDestinatario={setDestinatario}
                    data={data}
                />;
            case 2:
                return <ExplicaProblema
                    onClick={onClick}
                    problema={problema}
                    setProblema={setProblema}
                    data={data}
                />;
            case 3:
                return <CargarImg
                    onClick={onClick}
                    imagen= {imgen}
                    setImagen={setImagen}
                    data={data}
                />;
            case 4 :
                return <ResumenPeticion
                    title={title}
                    destinatario={destinatario}
                    problema={problema}
                    imagen={imgen}
                />

            default:
                return <CrearTitulo
                    onClick={onClick}
                    title={title}
                    setTitle={setTitle}
                />;
        }
    };


    return (
        <>
            <div className="max-w-screen-lg  mx-auto  inset-x-0 flex  flex-col items-center mt-6 ">
                <Steps
                    step={step}
                />
                {/* {(() => {
                    if (step === 0) {
                        return (
                            <>
                                <CrearTitulo
                                    onClick={onClick}
                                    setTitle={setTitle}
                                />
                            </>
                        )
                    } else if (step === 1) {
                        return (
                            <>
                                <EscogeDestinatario
                                    onClick={onClick}
                                />
                            </>
                        )
                    } else if (step === 2) {
                        return (
                            <>
                                <ExplicaProblema
                                    onClick={onClick}
                                />
                            </>
                        )
                    } else if (step === 3) {
                        return (
                            <>
                                <CargarImg
                                    onClick={onClick}
                                    image={image}
                                    setImage={setImage}
                                />
                            </>
                        )
                    }
                })()} */}

                {conditionalComponent()}



            </div>


        </>
    )


}

export default CrearPeticion



