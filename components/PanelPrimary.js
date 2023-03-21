import Link from "next/link";
import dayjs from "dayjs";
import Slider from "react-slick";
import Image from "next/image";

const PanelPrimary = ({ noticias }) => {
  const settings = {
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 2,
    slidesPerRow: 1,
    infinite: true,
    centerMode: false,
    pauseOnHover: true,
    lazyLoad: true,
    autoplay: true,
    centerPadding: "1000px",
    className: "react-slider",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {/* <div className="w-full space-x-4 gap-4 grid"> */}
      <div className="w-full gap-3 grid">
        <div className="grid md:grid-cols-2 gap-3">
          <PrincipalNew noticia={noticias[0]} className="h-96" />
          <div className="grid gap-3">
            <SecondaryNews noticia={noticias[1]} />
            <SecondaryNews noticia={noticias[2]} />
            <SecondaryNews noticia={noticias[3]} />
            <SecondaryNews noticia={noticias[4]} />
          </div>
        </div>
        <div className="relative grid grid-cols-1 w-full pb-0 overflow-hidden">
          <Slider {...settings}>
            {noticias?.slice(5)?.map((item, idx) => (
              <SliderNews key={idx} noticia={item} className="h-80 w-95 " />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default PanelPrimary;

export const AutorLine = ({ date, author }) => {
  return (
    <p className="capitalize text-xs font-body h-max">
      Por{" "}
      <Link href={`/author/${author ?? "Neybeth Pernía"}`}>
        <span className="text-blue-500 font-semibold capitalize hover:text-gray-800 transition cursor-pointer">{author ?? "Neybeth Pernía"}</span>
      </Link>{" "}
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
        className={`${fonts[font]} ${sizes[size]} ${justify && "text-justify"
          } font-semibold cursor-pointer hover:text-blue-500 transition`}
        {...rest}
      >
        {titulo}
      </h2>
    </Link>
  );
};

const PrincipalNew = ({ noticia, className }) => {
  const LoaderImage = ({ src, width, quality }) => {
    const domain = process.env.NEXT_PUBLIC_API_URL_new;
    return `${domain}${src}`;
  };
  return (
    <>
      <div
        className={`... w-full rounded p-4 relative flex items-end overflow-hidden cursor-pointer hover:opacity-95 transition ${className}`}
      >
        <Image
          loader={LoaderImage}
          src={`${noticia?.imgMiniatura?.i640}`}
          alt={noticia?.title}
          objectFit={"cover"}
          objectPosition={"center"}
          layout={"fill"}
        />

        <div className="p-3 w-full z-10 flex flex-col gap-1 text-white block-title ">
          <span className="z-20 grid gap-2">
            <Title
              titulo={noticia?.title}
              slug={noticia?.slug}
              justify={true}
              size="3xl"
            />
            <AutorLine author={noticia?.authorUsername} date={noticia?.createdAt} />
          </span>
        </div>
      </div>
      <style jsx>
        {`
          .block-title::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              0deg,
              rgba(32, 32, 32, 1) 0%,
              rgba(255, 255, 255, 0) 60%
            );
            z-index: 0;
          }
        `}
      </style>
    </>
  );
};

const SecondaryNews = ({ noticia, className }) => {
  const LoaderImage = ({ src }) => {
    const domain = process.env.NEXT_PUBLIC_API_URL_new;
    return `${domain}${src}`;
  };
  return (
    <>
      <div className={`grid grid-cols-3 gap-2`}>
        {/* <div className="h-20 w-auto overflow-hidden rounded relative"> */}
        <div className="h-auto w-auto overflow-hidden rounded relative">
          <Image
            loader={LoaderImage}
            src={`${noticia?.imgMiniatura?.i640}`}
            alt={noticia?.title}
            objectFit={"cover"}
            objectPosition={"center"}
            layout={"fill"}
          />
        </div>

        <div className="col-span-2 gap-2 flex flex-col text-gray-700 h-max">
          <Title titulo={noticia?.title} slug={noticia?.slug} />
          <AutorLine author={noticia?.authorUsername} date={noticia?.createdAt} />
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

const SliderNews = ({ noticia, className }) => {
  const LoaderImage = ({ src, width, quality }) => {
    const domain = process.env.NEXT_PUBLIC_API_URL_new;
    return `${domain}${src}`;
  };
  return (
    <>
      <div
        // className={`... w-full p-4 relative flex items-end overflow-hidden cursor-pointer hover:opacity-95 transition grid ${className}`}
        className={`... w-full p-4 relative items-end overflow-hidden cursor-pointer hover:opacity-95 transition grid ${className}`}
      >
        <Image
          loader={LoaderImage}
          src={`${noticia?.imgMiniatura?.i640}`}
          alt={noticia?.title}
          objectFit={"cover"}
          objectPosition={"center"}
          layout={"fill"}
        />

        <div className="p-3 w-full z-10 flex flex-col gap-1 text-white block-title ">
          <span className="z-20 grid gap-2">
            <Title
              titulo={noticia?.title}
              slug={noticia?.slug}
              justify={true}
              size="2xl"
            />
            <AutorLine author={noticia?.authorUsername} date={noticia?.createdAt} />
          </span>
        </div>
      </div>
      <style jsx>
        {`
          .block-title::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              0deg,
              rgba(32, 32, 32, 1) 0%,
              rgba(255, 255, 255, 0) 60%
            );
            z-index: 0;
          }
        `}
      </style>
    </>
  );
};
