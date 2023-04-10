


export const ButtonProvider = ({ provider, handle, icon }) => {
/*   const { signIn } = useAuthentication();
  const toast = useToast();
  const { setLoading } = LoadingContextProvider();
  const handleClick = async (provider) => {
    try {
      signIn("provider", provider);
    } catch (error) {
      setLoading(false);
      toast("error", JSON.stringify(error));
      console.log("este es un error en el onClick de los listProviders", error);
    }
  }; */
  return (
    <>
      <div className="*bg-blue-200 m-2">
          <button /* onClick={() => handleClick(handle)} */ className="*bg-red-200 rounded-md border-2 border-gray-200 hover:border-blue-300 hover:border-2 w-250px h-40px flex items-center justify-center" >
            {icon}
            <p className="*bg-blue-300 w-215px font-['Roboto'] text-[14px]">{`Continúa con ${provider}`}</p>
          </button>
      </div>
    </>
  )

}