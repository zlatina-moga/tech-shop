import Head from "next/head";

interface MetaProps {
  keywords: string;
  description: string;
  title: string;
}

const Meta = ({ keywords, description, title }: MetaProps) => {
  return (
    <Head>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="images/pcbun_icon.png" />
      <meta name="facebook-domain-verification" content="l3nkr3z72l73kpbj344pcx0d2yb3h4" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  keywords: "",
  description: "",
  title: "PC Bun",
};

export default Meta;