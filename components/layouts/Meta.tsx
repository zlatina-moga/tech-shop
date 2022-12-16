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
      <link rel="icon" href="img/favicon.ico" />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
      />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  keywords: "",
  description: "",
  title: "Tech Shop",
};

export default Meta;