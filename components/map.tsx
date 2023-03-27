import { MapContainer, Marker as LeafletMarker, Popup, TileLayer, Tooltip, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo, useRef, useState } from "react";
import { DivIcon, LatLng, Marker } from "leaflet";
import { theme } from "../constants";
import { Shop } from "../models";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import { IKImage } from "imagekitio-react";
import { DataService } from "../lib/data";


const MarkerIcon = new DivIcon({
    html: `<svg viewBox="0 0 24 24" fill="${theme.palette.primary.main}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    className: "grabbable",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
});

type NewPosCallback = (pos: LatLng) => void;

function ShopMarker({ shop }: { shop: Shop }) {

    const center = DataService.shopCoordinates(shop);
    if (center === undefined) return null;

    return (
        <LeafletMarker
            position={center}
            icon={MarkerIcon}
        >
            <Popup>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Link href={'/shops/' + shop.id}>
                        <Avatar
                            sx={{ width: "45px", height: "45px" }}
                            alt={shop.name ?? ''}
                        >
                            <IKImage
                                path={`shops/${shop.logo_path}`}
                                transformation={[{
                                    height: "45px",
                                    width: "45px"
                                }]}
                            />
                        </Avatar>
                    </Link>
                    <Box>
                    <Typography variant="h4" color="primary"><Link href={'/shops/' + shop.id}>{shop.name}</Link></Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="bold" sx={{margin: "0 !important"}}>{shop.address}</Typography>
                    </Box>
                </Box>
            </Popup>
        </LeafletMarker>
    )
}

function LocationMarker({ callback }: { callback: NewPosCallback }) {
    const [position, setPosition] = useState<LatLng>(new LatLng(41.3885578, 2.1654211));

    useMapEvents({
        click(e) {
            setPosition(e.latlng)
        },
    })

    const markerRef = useRef<Marker>(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    let newPos = marker.getLatLng();
                    setPosition(newPos);
                    callback(newPos);
                }
            },
        }),
        [callback],
    )

    return (
        <LeafletMarker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={MarkerIcon}
        >
            <Tooltip direction="bottom">Arrástrame hasta la ubicación de tu tienda</Tooltip>
        </LeafletMarker>
    )
}

const Locate = () => {
    const map = useMapEvents({
        locationfound(e) {
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    useEffect(() => {
        map.locate();
    }, [map]);

    return null
}

export default function Map(props: { callback?: NewPosCallback, shops?: Shop[], center?: [number, number], locate?: boolean}) {
    return (
        <MapContainer
            center={props.center ?? [41.3885578, 2.1654211]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
            scrollWheelZoom={false}
        >
            {props.locate !== false ? <Locate /> : null }
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {props.callback ? <LocationMarker callback={props.callback} /> : ''}
            {props.shops ? props.shops.map((shop) => <ShopMarker shop={shop} key={shop.id} />) : null}
        </MapContainer>
    )
}