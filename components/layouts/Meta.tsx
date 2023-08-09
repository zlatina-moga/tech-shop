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
      <link rel="icon" href="/images/pcbun_icon.png" />
      <meta name="facebook-domain-verification" content="79f2mlus5wlpmbqe7o7tjrchwslrmn" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  keywords: "",
  description: "",
  title: "",
};

export default Meta;