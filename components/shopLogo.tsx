import { Shop } from "../models"
import { ImageKitImage } from "./imageKitImage";

export const ShopLogo = ({shop, size}: {shop: Shop, size: number}) => {
    return (
        <ImageKitImage
            src={`shops/${shop.logo_path}`}
            placeholder="empty"
            alt={shop.name??''}
            width={size}
            height={size}
        />
    );
}