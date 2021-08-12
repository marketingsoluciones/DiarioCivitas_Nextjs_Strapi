import { FacebookIcon, InstagramIcon, TwitterIcon } from "./icons";
import Link from 'next/link'
const Footer = () => {
  const ListaSobreNosotros = [
    {title: "Anuncia", route: "/"},
    {title: "Sobre", route: "/"},
    {title: "Eventos", route: "/"},
    {title: "Escribe para nosotros", route: "/"},
    {title: "Prensa", route: "/"},
  ];
  const ListaCategorias = [
    {title: "Portada", route: "/"},
    {title: "Actualidad", route: "/"},
    {title: "Murcia", route: "/"},
    {title: "Lorca", route: "/"},
    {title: "Puerto Lumbreras", route: "/"},
    {title: "Ultimas noticias", route: "/"},
  ]
  const date = new Date
  return (
    <footer className="relative bg-primary h-full py-8 w-full mt-10">
      <div className="max-w-screen-xl w-full grid grid-cols-4 mx-auto inset-x-0 ">
        <div className="flex items-start gap-3 flex-col">
          <img src="/logoBlanco.png" className={`object-contain w-60`} />
          <p className="text-xs font-display text-white">
            © {date.getFullYear()} Diario Civitas | Sede Alicante
          </p>
          <div className="flex gap-4 py-2 items-center">
            <div className="h-10 w-10 rounded-full bg-blue-700 grid place-items-center">
              <FacebookIcon className="text-white w-5 h-5" />
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-500 grid place-items-center">
              <TwitterIcon className="text-white w-5 h-5" />
            </div>
            <div className="h-10 w-10 rounded-full bg-pink-600 grid place-items-center">
              <InstagramIcon className="text-white w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-16 justify-end col-span-3">
          <ListBlock titulo={"Sobre nosotros"} lista={ListaSobreNosotros}/>
          <ListBlock titulo={"Categorias"} lista={ListaCategorias}/>
          <div className="">
            <h3 className="font-display text-white uppercase text-md font-bold">
              Popular Posts
            </h3>
            <PopularPost title="Lose These 12 Bad Habits If You're Serious About Becoming a Millionaire" />
            <PopularPost title="Lose These 12 Bad Habits If You're Serious About Becoming a Millionaire" />
          </div>
        </div>


      </div>
    </footer>
  )
}

export default Footer

const PopularPost = (props) => {
  const { image, title } = props;
  return (
    <div className="flex w-full py-4">
      <div className="bg-gray-200 w-16 h-16 rounded-full">
        <img src={image} />
      </div>
      <div className="w-2/3 pl-2 h-full flex flex-col justify-center">
        <h3 className="text-xs text-white font-body">{title}</h3>
        <p className="text-xs pt-2 text-white">
          Francisco Montilla | 01 Marzo 2020
        </p>
      </div>
    </div>
  );
};


export const ListBlock = ({titulo, lista}) => {
  return (
    <div>
      <h3 className="font-display text-white uppercase text-md font-bold">
        {titulo}
      </h3>
      <ul className="flex flex-col gap-1 pt-4">
        {lista.map((item, idx) => (
          <Link href={item.route}>
          <li key={idx} className="font-body text-white text-xs">{item.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
