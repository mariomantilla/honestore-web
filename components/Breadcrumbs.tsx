import { Typography, Breadcrumbs as MUIBreadcrumbs } from "@mui/material";
import { BreadcrumbList, WithContext } from "schema-dts";
import { BASE_URL } from "../constants";
import Link from "next/link";


type Item = {
    name: string,
    path?: string
}

export default function Breadcrumbs({ items }: {items: Item[]}) {

    let allItems = items.slice();
    allItems.unshift({
        name: "Inicio",
        path: "/"
    });
    
    let breadcrumbStructuredData: WithContext<BreadcrumbList> = {
        '@context': "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": allItems.map((item, i) => {
            return {
                "@type": "ListItem",
                "position": i,
                "name": item.name,
                "item": BASE_URL+item.path
            }
        })
    }
    
    return (<>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
        <MUIBreadcrumbs aria-label="ruta de navegación">
            {allItems.map((item, i) => item.path ? (
                <Link href={item.path}>{item.name}</Link>
            ) : <Typography color="text.primary">{item.name}</Typography> )}
        </MUIBreadcrumbs>
    </>)
}