import Typography from "@mui/material/Typography"

function PolicyTitle(props: { id: string, title: string }) {
    return (
        <Typography variant="h3" sx={{ padding: "0.5em" }} id={props.id}>{props.title}</Typography>
    )
}

export default function Policy(props: { id: string, title: string, children: React.ReactNode | React.ReactNode[] }) {
    return (
        <>
            <PolicyTitle title={props.title} id={props.id} />
            {props.children}
        </>
    )
}