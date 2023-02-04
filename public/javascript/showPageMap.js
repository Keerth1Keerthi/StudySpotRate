
mapboxgl.accessToken = mapToken
console.log(mapToken);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: place.geometry.coordinates, // starting position [lng, lat]
    zoom: 11, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(place.geometry.coordinates)
    .addTo(map)