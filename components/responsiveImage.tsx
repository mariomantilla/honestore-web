import Box from "@mui/material/Box";
import Image, { StaticImageData } from "next/image";


export default function ResponsiveImage(props: {image: StaticImageData, width: string, alt: string}) {
    return (
        <Box className="image-container" sx={{ maxWidth: props.width }}>
            <Image src={props.image} fill sizes={props.width} alt={props.alt} className="image" priority quality={100} />
        </Box>
    )
}