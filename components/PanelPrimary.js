import Link from "next/link";
import dayjs from "dayjs";
import Slider from "react-slick";

const PanelPrimary = ({ noticias }) => {
  const settings = {
    dots: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    slidesPerRow: 1,
    infinite: false,
    centerMode: false,
    pauseOnHover: true,
    lazyLoad: true,
    centerPadding: "1000px",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="w-full grid md:grid-cols-2 md:h-96 gap-4">
        <PrincipalNew noticia={noticias[0]} className="h-96" />
        <div className="w-full h-max grid grid-rows-2 gap-4">
          <PrincipalNew noticia={noticias[1]} />
          <PrincipalNew noticia={noticias[2]} />
        </div>
      </div>
      <div className="relative grid grid-cols-1 w-full pb-10 overflow-hidden">
        <Slider {...settings}>
          {noticias?.slice(3)?.map((item, idx) => (
            <PrincipalNew key={idx} noticia={item} className="h-80 w-95 " />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default PanelPrimary;

export const AutorLine = ({ date, author }) => {
  return (
    <p className="capitalize text-xs font-body h-max">
      Por{" "}
      <span className="text-blue-500 font-semibold capitalize hover:text-gray-800 transition cursor-pointer">
        {author ?? "Jhon Doe"}
      </span>{" "}
      - {date ? dayjs(date).format("DD MMM YYYY") : "00 Ene 2021"}
    </p>
  );
};

export const Title = ({
  size,
  titulo,
  slug,
  justify = false,
  font = "display",
  ...rest
}) => {
  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-md md:text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
  };

  const fonts = {
    body: "font-body",
    display: "font-display",
  };
  return (
    <Link href={slug ? `/${slug}` : "/"}>
      <h2
        className={`${fonts[font]} ${sizes[size]} ${
          justify && "text-justify"
        } font-semibold cursor-pointer hover:text-blue-500 transition`}
        {...rest}
      >
        {titulo}
      </h2>
    </Link>
  );
};

const TagCategories = ({ postcategorias }) => {
  const colors = {
    actualidad: "bg-red-500",
    salud: "bg-green-500",
  };

  const Tag = ({ categoria }) => {
    return (
      <div
        className={`${
          colors[categoria.toLowerCase()]
        } rounded px-2 py-1 cursor-pointer hover:opacity-90 transition`}
      >
        <p className="font-display text-white text-xs uppercase">{categoria}</p>
      </div>
    );
  };

  return (
    <div className="flex gap-2 items-center justify-center absolute bottom-5 left-5">
      {postcategorias?.map(
        (item, idx) =>
          item !== "Portada" && <Tag key={idx} categoria={item.categorie} />
      )}
    </div>
  );
};

const PrincipalNew = ({ noticia, className }) => {
  return (
    <>
      <div
        className={`... w-full rounded-lg p-4 relative flex items-end overflow-hidden ${className}`}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${noticia?.imgPrincipal?.url}`}
          className="absolute w-full h-full top-0 left-0 z-0 object-cover"
        />
        <div className="bg-white p-3 w-full rounded-lg z-10 flex flex-col gap-1">
          <Title titulo={noticia?.title} slug={noticia?.slug} justify={true} />
          <AutorLine date={noticia?.createdAt} />
        </div>
      </div>
      <style jsx>
        {`
          @media screen and (min-width: 1024px) {
            .w-95 {
                width: 95%;
              }
          }
        `}
      </style>
    </>
  );
};
