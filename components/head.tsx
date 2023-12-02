import Head from "next/head";

export default function OverrideHead(props: {
    title?: string,
    description?: string,
    image?: string,
    canonical?: string
}) {
    return (
        <Head>
            {props.title ? <title>{props.title}</title> : '' }
            {props.title ? <meta property="og:title" content={props.title} key="meta-og-title" /> : '' }
            {props.description ? <meta name="description" content={props.description} /> : '' }
            {props.description ? <meta property="og:title" content={props.description} key="meta-og-desc" /> : '' }
            {props.image ? <meta property="og:image" content={props.image} key="head-image" /> : '' }
            {props.canonical ? <link href={props.canonical} rel="canonical" key="head-canonical" /> : '' }
        </Head>
    );
}