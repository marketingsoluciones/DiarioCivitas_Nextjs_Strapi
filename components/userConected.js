import { AuthContextProvider } from "../context"
import { Capitalize } from "../utils/Capitalize"
import { UserForm } from "./icons"

export const UserConected = () => {
  const { user } = AuthContextProvider()
  return (
    <>
      <UserForm />
      <div className="ml-1">
        <div>
          {user && Capitalize(user.displayName)}
        </div>
        <div className="">
          {!user ? "Iniciar sesión" : "Cerrar sesión"}
        </div>
      </div>
    </>
  )
}