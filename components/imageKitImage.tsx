import { imageKitLoader, getFixedRatioLoader } from "../lib/imagekitloader";
import Image, { ImageProps } from "next/image"

export const ImageKitImage = (props: ImageProps) => {
    return (
        <Image
            loader={imageKitLoader}
            {...props}
        />
    );
}

export const FixedRatioImageKitImage = (props: ImageProps) => {
    const height = parseFloat(`${props.height}`)??0;
    const width = parseFloat(`${props.width}`)??1;
    const loader = getFixedRatioLoader(height/width);
    return (
        <Image
            loader={loader}
            {...props}
        />
    );
}