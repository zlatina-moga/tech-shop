import Head from "next/head";

interface MetaProps {
    keywords: string;
    description: string;
}

const Meta = ({keywords, description}: MetaProps) => {
    return (
        <Head>
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
        </Head>
    )
}

Meta.defaultProps = {
    keywords: '',
    description: ''
}

export default Meta;