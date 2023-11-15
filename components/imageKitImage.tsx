import { imageKitLoader } from "../lib/imagekitloader";
import Image, { ImageProps } from "next/image"

export const ImageKitImage = (props: ImageProps) => {
    return (
        <Image
            loader={imageKitLoader}
            {...props}
        />
    );
}