import { Form, Formik, FormikConfig, FormikValues, useFormikContext } from "formik";
import { CrearTitulo } from "../../components/peticiones/CrearTitulo"
import { ExplicaProblema } from "../../components/peticiones/ExplicaProblema"
import { Steps } from "../../components/peticiones/PeticionesSteps"
import { EscogeDestinatario } from "../../components/peticiones/Destinatario"
import { CargarImg } from "../../components/peticiones/CargarImg"
import { ResumenPeticion } from "../../components/peticiones/ResumenPeticion";
import { useState } from "react"
import { fetchApi, queries } from "../../utils/Fetching";
import { useToast } from "../../hooks/useToast";
import { AuthContextProvider } from "../../context";


const CrearPeticion = () => {
    const { user } = AuthContextProvider()

    const [step, setStep] = useState(0)
    const [problema, setProblema] = useState("")
    const [imgen, setImagen] = useState([])
    const toast = useToast()

    const onClick = () => {
        setStep(step + 1)
    }

    const handleSubmit = async (values) => {
        try {
            const slug = values.title.replace(/[^a-zA-Z0-9_-]/g, '-').replace("---", '-').replace("--", '-').toLowerCase()
            const { _id } = await fetchApi({
                query: queries.getOneSubCategoryPost,
                variables: { slug: "campaña" },
            });
            values = {
                ...values,
                slug,
                subCategories: [_id],
                authorUsername: user.displayName
            }
            if (_id) {
                await fetchApi({
                    query: queries.createPost,
                    variables: { ...values, development: "diariocivitas" },
                    type: "formData"
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const initialValue = {
        title: " ",
        subTitle: "",
        content: "",
        seoDescription: "",
        subCategories: [],
        tags: [],
        authorUsername: "",
        imgCarrusel: [],
        imgMiniatura: null
    }

    return (
        <>
            <div className="bg-white max-w-screen-lg  mx-auto  inset-x-0 flex  flex-col items-center pt-6 ">
                <Steps step={step} />
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValue}
                >
                    <Form
                        className="flex flex-col items-center"
                    >
                        {(() => {
                            switch (step) {
                                case 0:
                                    return (
                                        <>
                                            <CrearTitulo
                                                onClick={onClick}
                                            />;
                                        </>
                                    )
                                    break;
                                case 1:
                                    return (
                                        <>
                                            <EscogeDestinatario
                                                onClick={onClick}
                                            />;
                                        </>
                                    )
                                    break;
                                case 2:
                                    return (
                                        <>
                                            <ExplicaProblema
                                                onClick={onClick}
                                                problema={problema}
                                                setProblema={setProblema}

                                            />;
                                        </>
                                    )
                                    break;
                                case 3:
                                    return (
                                        <>
                                            <CargarImg
                                                onClick={onClick}
                                                imagen={imgen}
                                                setImagen={setImagen}

                                            />
                                        </>
                                    )
                                    break;
                                default:
                                    break;
                            }
                        })()}
                    </Form>
                </Formik>
            </div >
        </>
    )
}

export default CrearPeticion



