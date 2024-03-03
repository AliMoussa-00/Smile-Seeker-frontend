import { useEffect, useRef, useState } from 'react';

import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpLW1vdXNzYSIsImEiOiJjbHNqNzhibWQxZ29lMmtvdTZqeGdlc2tmIn0.BHmyEW0pIEMefAqAbePh_g';

const DoctorPage = () => {
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const [destinationLng, setDestinationLng] = useState(-70.8); // Example destination longitude
    const [destinationLat, setDestinationLat] = useState(42.36); // Example destination latitude
    const mapContainer = useRef(null);


    useEffect(() => {
        // Initialize map when component mounts
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat], // Set initial center
            zoom: zoom, // Set initial zoom level
        });
        
        // Add marker for current location
        const currentLocationMarker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
        // Add marker for destination
        const destinationMarker = new mapboxgl.Marker().setLngLat([destinationLng, destinationLat]).addTo(map);

        // Update coordinates when map moves
        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
            // marker.setLngLat([map.getCenter().lng, map.getCenter().lat]);
        });

        // Clean up map instance when component unmounts
        return () => map.remove();
    }, []); // Empty dependency array to run effect only once

    return (
        <div>
            {/* Map container */}
            <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
        </div>
    );
};

export default DoctorPage;