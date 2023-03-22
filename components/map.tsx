import { MapContainer, Marker as LeafletMarker, Popup, TileLayer, Tooltip, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo, useRef, useState } from "react";
import { DivIcon, LatLng, Marker } from "leaflet";
import { theme } from "../constants";
import { Shop } from "../models";

const MarkerIcon = new DivIcon({
    html: `<svg viewBox="0 0 24 24" fill="${theme.palette.primary.main}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    className: "grabbable",
    iconSize: [36, 36],
    iconAnchor: [18, 0]
});

type NewPosCallback = (pos: LatLng) => void;

function DraggableMarker({ center, callback}: { center: LatLng, callback: NewPosCallback}) {
    const [position, setPosition] = useState(center)
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

function ShopMarker({ shop }: { shop: Shop }) {

    if (shop.location_coordinates == null) return null
    const coords = shop.location_coordinates.split(' ').map((x) => parseFloat(x));
    const center: [number, number] = [coords[0], coords[1]];

    return (
        <LeafletMarker
            position={center}
            icon={MarkerIcon}
        >
            <Popup>
                {shop.name}
            </Popup>
        </LeafletMarker>
    )
}

function LocationMarker(props: {callback: NewPosCallback}) {
    const [position, setPosition] = useState<LatLng>(new LatLng(41.3885578, 2.1654211));
    const map = useMapEvents({
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    useEffect(() => {
        map.locate();
    }, [map]);

    return (
        <DraggableMarker center={position} callback={props.callback} />
    )
}

export default function Map(props: {callback?: NewPosCallback, shops?: Shop[], center?: [number, number]}) {
    return (
        <MapContainer
            center={props.center??[41.3885578, 2.1654211]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {props.callback ? <LocationMarker callback={props.callback} /> : '' }
            {props.shops ? props.shops.map((shop) => <ShopMarker shop={shop} key={shop.id} />) : null }
        </MapContainer>
    )
}