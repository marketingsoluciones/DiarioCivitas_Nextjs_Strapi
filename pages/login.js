import { LoginComponent } from "../components/Login/LoginComponent"

const Login = () => {
    return (
        <>
            <div className="*w-screen *fixed h-full *top-0 *left-0  z-30  ">
                <div className="*bg-gray-200 w-full h-full  *relative flex items-center justify-center my-10  ">
                    <LoginComponent/>
                </div>
            </div>
        </>
    )
}

export default Login 