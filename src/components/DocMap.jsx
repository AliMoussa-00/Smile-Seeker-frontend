import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpLW1vdXNzYSIsImEiOiJjbHNqNzhibWQxZ29lMmtvdTZqeGdlc2tmIn0.BHmyEW0pIEMefAqAbePh_g';

const DocMap = () => {
    // for the map
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
    })

    return (
        <div ref={mapContainer} className="map-container " style={{ width: '100%', height: '400px' }} />
    )
};

export default DocMap;