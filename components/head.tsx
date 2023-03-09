import Head from "next/head";

export default function OverrideHead(props: {title?: string, description?: string}) {
    return (
        <Head>
            {props.title ? (<title>{props.title}</title>) : '' }
            {props.title ? (<meta property="og:title" content={props.title} />) : '' }
            {props.description ? (<meta name="description" content={props.description} />) : '' }
            {props.description ? (<meta property="og:title" content={props.description} />) : '' }
        </Head>
    );
}