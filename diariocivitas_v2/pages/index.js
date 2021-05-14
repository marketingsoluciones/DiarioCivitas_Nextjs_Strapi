import { BurgerIcon, NotificationIcon } from "../icons/icons";

const Home = () => {
  return (
      <>
      <TopNav />
      <div className="flex gap-4">
        <div className="bg-gray-300 w-96 h-96 rounded-3xl inset-x-0 mx-auto ">

        </div>
        
        <div className="bg-gray-300 w-96 h-96 rounded-3xl inset-x-0 mx-auto ">

        </div>
      </div>
      </>
  ) 
}; 

export default Home;

const TopNav = () => {
  return (
    <div className="flex items-center justify-between py-6 px-4">
      <div className="bg-gray-900 w-11 h-11 rounded-xl grid place-items-center">
        <BurgerIcon className="text-white w-6 h-6" />
      </div>

      <div className="w-60">
        <img src="/logo.png" alt="Diario Civitas" />
      </div>

      <div className="bg-white border-2 border-gray-900 w-11 h-11 rounded-xl grid place-items-center">
        <NotificationIcon className="text-gray-900 w-6 h-6" />
      </div>
    </div>
  );
};
