import Image from "next/dist/client/image";

const Loading = () => {
  return (
    <div className="text-primary w-screen h-screen bg-white flex items-center justify-center fixed z-50  top-0 left-0">
      <LoadingItem text={"Procesando, espere un momento"} />
    </div>
  );
};

export default Loading;

const sizes = {
  small: "w-10 h-10",
  medium: "w-16 h-16",
  large: "w-20 h-20"
}
export const LoadingItem = ({ text, size = "large" }) => {
  return (
    <>
      <div className="fixed top-0 left-0 bg-white w-full h-full z-50 grid place-items-center">
        <div className="flex flex-col items-center justify-center">
          <span className="img">
            <Image
              src={`/logo.png`}
              alt={"Diario Civitas"}
              objectFit={"contain"}
              objectPosition={"center"}
              height={40}
              width={320}
              priority={true}
            />
          </span>

          <p className="text-xs text-gray-400 w-full text-center py-2 font-body">
            {text}
          </p>
        </div>
      </div>
      <style jsx>
        {`
              @keyframes logoAnimation {
                0% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.2);
                }
                100% {
                  transform: scale(1);
                }
              }
              .img {
                animation-name: logoAnimation;
                animation-duration: 7s;
                animation-iteration-count: infinite;
              }
            `}
      </style>
    </>

  )
}