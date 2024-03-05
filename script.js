// Define your places of interest with attributes
var placesOfInterest = [
    { name: "Place 1", type: "restaurant", price: "cheap", kidFriendly: "yes", latlng: [51.505, -0.09] },
    { name: "Place 2", type: "museum", price: "moderate", kidFriendly: "no", latlng: [51.51, -0.1] },
    // Add more places of interest as needed
];

// Initialize map
var map = L.map('map').setView([51.505, -0.09], 13); // Adjust the initial view coordinates and zoom level as needed
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add markers for each place of interest
placesOfInterest.forEach(place => {
    L.marker(place.latlng).addTo(map)
        .bindPopup(`<b>${place.name}</b><br>Type: ${place.type}<br>Price: ${place.price}<br>Kid Friendly: ${place.kidFriendly}`);
});

// Function to filter places based on selected criteria
function filterPlaces() {
    var type = document.getElementById('type').value;
    var price = document.getElementById('price').value;
    var kidFriendly = document.getElementById('kidFriendly').value;

    placesOfInterest.forEach(place => {
        var marker = map.getLayers().find(layer => layer instanceof L.Marker && layer.getLatLng().equals(place.latlng));
        if (!marker) return;

        var showMarker = (type === 'all' || place.type === type) &&
                         (price === 'all' || place.price === price) &&
                         (kidFriendly === 'all' || place.kidFriendly === kidFriendly);

        showMarker ? marker.addTo(map) : map.removeLayer(marker);
    });
}

// Attach event listeners to filter dropdowns
document.getElementById('type').addEventListener('change', filterPlaces);
document.getElementById('price').addEventListener('change', filterPlaces);
document.getElementById('kidFriendly').addEventListener('change', filterPlaces);