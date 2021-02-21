// Visualizing-Data-with-Leaflet - logic.js

// Earthquakes & Tectonic Plates GeoJSON URL Variables
var EarthQuakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var platesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Initialize & Create Two Separate LayerGroups: earthquakes & tectonicPlates

var earthquakes_layer = new L.LayerGroup();
var tectonicPlates_layer = new L.LayerGroup();


// Perform a GET request to the query URL
d3.json(EarthQuakeUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function

    var earthquakes = data.features
    console.log(earthquakes)
  // Loop through the earthquake data and create one circle marker for each earthquake

  
    // Define Variable and Tile layers
    var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data © <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY
    });
  
    var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY

    });

    var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.outdoors",
      accessToken: API_KEY

    });
  
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Satellite": satelliteMap,
      "Grayscale": grayscale,
      "Outdoors" : outdoorsMap

    };
  
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes_layer,
      " Fault Lines": tectonicPlates_layer,
    };
  
    // Create  map, giving it Satellitemap and earthquakes layers to display on load
    var myMap = L.map("mapid", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [satelliteMap, earthquakes_layer]
    });
  
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
     }).addTo(myMap);

     

     // Function to Determine Color of Marker Based on the Magnitude of the Earthquake
     function chooseColor(magnitude) {
        switch (true) {
        case magnitude > 5:
            return "#581845";
        case magnitude > 4:
            return "#900C3F";
        case magnitude > 3:
            return "#C70039";
        case magnitude > 2:
            return "#FF5733";
        case magnitude > 1:
            return "#FFC300";
        default:
            return "#DAF7A6";
        }
     }