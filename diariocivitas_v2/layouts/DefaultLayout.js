import Head from "next/head";
const DefaultLayout = (props) => {
    const {children} = props
  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </div>
  );
};

export default DefaultLayout;
