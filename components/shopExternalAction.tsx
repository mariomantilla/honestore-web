import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

export default function ShopExternalAction(props: { title: string, url: string, children: React.ReactNode | React.ReactNode[] }) {
    return (
        <Tooltip title={props.title}>
            <Link href={props.url} target="_blank" rel="noreferrer">
                {props.children}
            </Link>
        </Tooltip>
    );
}