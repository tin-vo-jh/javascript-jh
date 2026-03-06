// Environment & Map Setup

// Environment Setup: Token is stored in config.js (excluded from version control)
import { MAPBOX_TOKEN } from './config.js';

function useMap() {
    // Create a private scoped reference to mapboxgl
    // This prevents direct manipulation of the global mapboxgl object
    const mapboxInstance = mapboxgl;

    // Set token on private instance
    mapboxInstance.accessToken = MAPBOX_TOKEN;

    // Map Rendering
    const map = new mapboxInstance.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [107.3075, 10.4778],
        zoom: 12
    });

    // Lock accessToken after map is initialized
    Object.defineProperty(mapboxInstance, 'accessToken', {
        get: () => undefined,
        set: () => {},
        configurable: false
    });

    // Create Info Card (Popup): Create an HTML popup
    const initialPopup = new mapboxInstance.Popup({ offset: 25 })
        .setHTML(`
            <div class="info-card-title">Dat Do</div>
            <div class="info-card-address">Default starting location</div>
        `);

    // Add Marker: Use mapboxgl.Marker() attached to a hardcoded coordinate
    let currentMarker = new mapboxInstance.Marker({ color: '#007cbf' })
        .setLngLat([107.3075, 10.4778])
        .setPopup(initialPopup)
        .addTo(map);

    // Geocoding & Autocomplete Search
    const searchInput = document.getElementById('search-input');
    const suggestionsList = document.getElementById('suggestions-list');

    // Debounce technique: Set up setTimeout to wait for user to finish typing
    let debounceTimer;

    // Call API when input changes
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.trim();

        // Clear the existing timer on every keystroke
        clearTimeout(debounceTimer);

        // Hide dropdown if input is cleared
        if (!query) {
            suggestionsList.hidden = true;
            suggestionsList.innerHTML = '';
            return;
        }

        // Start a new timer. It only executes if user stops typing for 400ms
        debounceTimer = setTimeout(() => {
            fetchGeocodingData(query);
        }, 400);
    });

    // Read docs Geocoding API: Use fetch() to call the API
    async function fetchGeocodingData(query) {
        // Mapbox Geocoding endpoint with limit and autocomplete params
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=10`;

        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Network response failed');

            const data = await response.json();
            renderSuggestions(data.features);
        } catch (error) {
            console.error('Error fetching geocoding data:', error);
        }
    }

    // Render the results into the UI
    function renderSuggestions(features) {
        suggestionsList.innerHTML = '';

        if (features.length === 0) {
            suggestionsList.hidden = true;
            return;
        }

        features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature.place_name;

            // Listen for a click on a suggestion
            li.addEventListener('click', () => {
                handleLocationSelect(feature);
            });

            suggestionsList.appendChild(li);
        });

        suggestionsList.hidden = false;
    }

    // Choose location -> Fly to
    function handleLocationSelect(feature) {
        const coordinates = feature.center; // Extracts [lng, lat]
        const placeName = feature.place_name;
        const shortName = feature.text;

        // 1. Update Input UI and hide dropdown
        searchInput.value = placeName;
        suggestionsList.hidden = true;

        // 2. Use map.flyTo() function to move the map there
        map.flyTo({
            center: coordinates,
            zoom: 14,
            essential: true
        });

        // 3. Remove old marker
        if (currentMarker) {
            currentMarker.remove();
        }

        // 4. Create new Info Card (Popup)
        const popup = new mapboxInstance.Popup({ offset: 25 })
            .setHTML(`
                <div class="info-card-title">${shortName}</div>
                <div class="info-card-address">${placeName}</div>
            `);

        // 5. Place new marker at selected coordinates
        currentMarker = new mapboxInstance.Marker({ color: '#007cbf' })
            .setLngLat(coordinates)
            .setPopup(popup)
            .addTo(map);

        currentMarker.togglePopup();
    }

    // Global listener: Close suggestions if clicking somewhere else on the screen
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
            suggestionsList.hidden = true;
        }
    });
}

useMap();
