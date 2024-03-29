import { MapContainer, Marker as LeafletMarker, Popup, TileLayer, Tooltip, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { DivIcon, LatLng, LatLngTuple, Marker } from "leaflet";
import { theme } from "../constants";
import { Shop } from "../models";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import { DataService } from "../lib/data";
import LocationOff from "@mui/icons-material/LocationOff";
import Chip from "@mui/material/Chip";
import { ShopLogo } from "./shopLogo";


const MarkerIcon = new DivIcon({
    html: `<svg viewBox="0 0 24 24" fill="${theme.palette.primary.main}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    className: "grabbable",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
});

const ShopIcon = new DivIcon({
    html: `<svg viewBox="0 0 24 24" fill="${theme.palette.primary.main}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
});

const OnlineIcon = new DivIcon({
    html: `<div></div>`,
    className: "online",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
});

const DefaultCenter: [number, number] = [41.3885578, 2.1654211];

type NewPosCallback = (pos: LatLng) => void;

function ShopMarker({ shop }: { shop: Shop }) {

    const center = DataService.shopCoordinates(shop);
    if (center === undefined) return null;

    return (
        <LeafletMarker
            position={center}
            icon={shop.online ? OnlineIcon : ShopIcon}
        >
            <Popup>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Link href={'/shops/' + shop.slug}>
                        <Avatar
                            sx={{ width: "45px", height: "45px", backgroundColor: '#fff' }}
                            alt={shop.name ?? ''}
                        >
                            <ShopLogo shop={shop} size={45} />
                        </Avatar>
                    </Link>
                    <Box>
                    <Typography variant="h4" color="primary"><Link href={'/shops/' + shop.slug}>{shop.name}</Link></Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="bold" sx={{margin: "0 !important"}}>{shop.address}</Typography>
                    {shop.online ? (
                        <Chip icon={<LocationOff />} label="Solo online" />
                    ) : null }
                    </Box>
                </Box>
            </Popup>
        </LeafletMarker>
    )
}

function LocationMarker({ callback, center, markerRef }: { callback: NewPosCallback, center: LatLngTuple, markerRef?: RefObject<Marker> }) {
    const [position, setPosition] = useState<LatLng>(new LatLng(center[0], center[1]));

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            callback(e.latlng);
        },
    })

    const localRef = useRef<Marker>(null);

    if (!markerRef) markerRef = localRef;
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef?.current
                if (marker != null) {
                    let newPos = marker.getLatLng();
                    setPosition(newPos);
                    callback(newPos);
                }
            },
        }),
        [callback, markerRef],
    )

    return (
        <LeafletMarker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={MarkerIcon}
        >
            <Tooltip direction="bottom">Arrástrame hasta la ubicación de tu comercio</Tooltip>
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

export default function Map(props: { callback?: NewPosCallback, shops?: Shop[], center?: [number, number], locate?: boolean, locationMarker?: RefObject<Marker>, mapRef?: any}) {
    let center = props.center ?? DefaultCenter;
    let localRef =  useRef();
    let mapRef = props.mapRef ? props.mapRef : localRef; 
    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
            scrollWheelZoom={false}
            ref={mapRef}
        >
            {props.locate !== false ? <Locate /> : null }
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {props.callback ? <LocationMarker callback={props.callback} center={center} markerRef={props.locationMarker} /> : ''}
            {props.shops ? props.shops.map((shop) => <ShopMarker shop={shop} key={shop.id} />) : null}
        </MapContainer>
    )
}