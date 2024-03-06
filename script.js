var placesOfInterest = [
    { name: "Burke Bakehouse", type: "food", breakfast: true, lunch: true, dinner: false, price: "$$", kidFriendly: "no", latlng: [35.07735585786323, -106.64554831714555], notes: "Excellent pastries!", url: 'https://www.google.com/maps/place/The+Burque+Bakehouse/@35.0771759,-106.6481554,17z/data=!3m1!4b1!4m6!3m5!1s0x8722745ac993ffff:0xe381395a75bc9ff8!8m2!3d35.0771715!4d-106.6455805!16s%2Fg%2F11hbn79vsr?entry=ttu' },
    { name: "Ihatov Bread and Coffee", type: "food", price: "$$", kidFriendly: "no", latlng: [35.080123810952095, -106.6069213478268], notes: "Excellent pastries!", url: 'https://www.google.com/maps/place/Ihatov+Bread+and+Coffee/@35.0797946,-106.6094426,17z/data=!3m1!4b1!4m6!3m5!1s0x87220b9cc5505bbb:0x43f763043ca04af1!8m2!3d35.0797902!4d-106.6068677!16s%2Fg%2F11fsr_p8rg?entry=ttu' },
    // Add more places of interest as needed
];
function displayNotes(place) {
    var notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = `<h3>${place.name}</h3><p>${place.notes}</p>`;
}

// Function to navigate to a specified URL
function navigateToURL(url) {
    console.log('triggered navigate function!')
    // window.location.href = url;
    window.open(url, '_blank');
}

// Attach event listener to the "Visit Website" button
document.getElementById('visitWebsiteBtn').addEventListener('click', function() {
    // Find the currently displayed marker
    console.log("button clicked!")
    var currentMarker = markers.find(marker => marker.isPopupOpen());

    // If a marker is currently displayed
    console.log(currentMarker)
    if (currentMarker) {
        // Retrieve the associated place object from the marker
        var place = currentMarker.place;
        
        // If the place object exists and has a URL
        if (place && place.url) {
            // Navigate to the specified URL
            navigateToURL(place.url);
        }
    }
});


// Define a global variable to store markers
var markers = [];

// Function to filter places based on selected criteria
function filterPlaces() {
    var type = document.getElementById('type').value;
    var price = document.getElementById('price').value;
    var kidFriendly = document.getElementById('kidFriendly').value;

    markers.forEach(marker => {
        var place = marker.place;
        var showMarker = (type === 'all' || place.type === type) &&
                         (price === 'all' || place.price === price) &&
                         (kidFriendly === 'all' || place.kidFriendly === kidFriendly);

        showMarker ? marker.addTo(map) : map.removeLayer(marker);
    });
}

// Add markers for each place of interest
placesOfInterest.forEach(place => {
    var marker = L.marker(place.latlng).bindPopup(`<b>${place.name}</b><br>Type: ${place.type}<br>Price: ${place.price}<br>Kid Friendly: ${place.kidFriendly}`);
    marker.place = place; // Attach place object to marker
    markers.push(marker); // Push marker to global markers array
    marker.on('click', function() {
        displayNotes(place);
    });
});

// Initialize map
var map = L.map('map').setView([35.105607537980916, -106.62850720672968], 12); // Adjust the initial view coordinates and zoom level as needed
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add markers to map
markers.forEach(marker => {
    marker.addTo(map);
});

// Attach event listeners to filter dropdowns
document.getElementById('type').addEventListener('change', filterPlaces);
document.getElementById('price').addEventListener('change', filterPlaces);
document.getElementById('kidFriendly').addEventListener('change', filterPlaces);