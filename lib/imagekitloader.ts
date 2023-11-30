import { ImageLoaderProps } from "next/image";

export const imageKitLoader = ({ src, width, quality }: ImageLoaderProps) => {
    if(src[0] === "/") src = src.slice(1);
    const params = [`w-${width}`];
    if (quality) {
      params.push(`q-${quality}`);
    }
    const paramsString = params.join(",");
    var urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT??'';
    if(urlEndpoint[urlEndpoint.length-1] === "/") urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
    return `${urlEndpoint}/${src}?tr=${paramsString}`
}

export const getFixedRatioLoader = (ratio: number) => {
  return ({ src, width, quality }: ImageLoaderProps) => {
    if(src[0] === "/") src = src.slice(1);
    const params = [`w-${width}`,`h-${width*ratio}`];
    if (quality) {
      params.push(`q-${quality}`);
    }
    const paramsString = params.join(",");
    var urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT??'';
    if(urlEndpoint[urlEndpoint.length-1] === "/") urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
    return `${urlEndpoint}/${src}?tr=${paramsString}`
  }
}