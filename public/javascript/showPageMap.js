
mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
    container: 'showMap', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: place.geometry.coordinates, // starting position [lng, lat]
    zoom: 14, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(place.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h4>${place.title}</h4><h6>${place.address}</h6>`
            )
    )
    .addTo(map)
map.addControl(new mapboxgl.NavigationControl());
