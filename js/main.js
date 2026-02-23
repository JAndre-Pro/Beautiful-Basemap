mapboxgl.accessToken = 'pk.eyJ1IjoiamFuZHJlLXBybyIsImEiOiJjbWxmaTFsOTIwMjY5M2VvaWIzbWgyb3F2In0.6E3iTTICdzYRJcjiQGGCMQ';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/jandre-pro/cmlwyuil3000401sm8dnye6eg', // style URL
  center: [-98.5795, 39.8283], // starting position [lng, lat]
  zoom: 3.5 // starting zoom
});

map.on('load', () => {

    fetch('/data/phzm_us_zones_shp_2023.json')
        .then(response => response.json())
        .then(data => {

            map.addSource('zones', {
                type: 'geojson',
                data: data
            });

            map.addLayer({
                id: 'zones-layer',
                type: 'fill',
                source: 'zones',
                paint: {
                    'fill-color': [
                        'match',
                        ['get', 'zone'],

                        '3a', '#03c2f1',
                        '3b', '#025a68',
                        '4a', '#0681f3',
                        '4b', '#045fd4',
                        '5a', '#0334b9',
                        '5b', '#0919a8',
                        '6a', '#7263f5',
                        '6b', '#fdfcfd',
                        '7a', '#b2f17e',
                        '7b', '#59f12a',
                        '8a', '#0c7022',
                        '8b', '#FED976',
                        '9a', '#faf73d',
                        '9b', '#f7ac77',
                        '10a', '#FD8D3C',
                        '10b', '#FC4E2A',
                        '11a', '#E31A1C',
                        '12a', '#BD0026',

                        '#cccccc' // default color
                    ],
                    'fill-opacity': 0.4
                }
            });
        });
});       

const zoneColor = [['get', 'zone'],

                        '3a', '#03c2f1',
                        '3b', '#025a68',
                        '4a', '#0681f3',
                        '4b', '#045fd4',
                        '5a', '#0334b9',
                        '5b', '#0919a8',
                        '6a', '#7263f5',
                        '6b', '#fdfcfd',
                        '7a', '#b2f17e',
                        '7b', '#59f12a',
                        '8a', '#0c7022',
                        '8b', '#FED976',
                        '9a', '#faf73d',
                        '9b', '#f7ac77',
                        '10a', '#FD8D3C',
                        '10b', '#FC4E2A',
                        '11a', '#E31A1C',
                        '12a', '#BD0026',

                        '#cccccc' // default color
                    ]

map.on('click', 'zones-layer', (e) => {

    const properties = e.features[0].properties;

    const popupContent =
            "<p>Zone: " + properties.zone + "</p>" +
            "<p>Average Annual Extreme Winter Temperature: " + properties.trange + "(F)"+"</p>";
        
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(popupContent)
        .addTo(map);
});
        



// function getColor(d) {
//         return  d === "3a"  ? '#03c2f1' :
//                 d === "3b"  ? '#025a68' :
//                 d === "4a"  ? '#0681f3' :
//                 d === "4b"  ? '#045fd4' :
//                 d === "5a"  ? '#0334b9' :
//                 d === "5b"  ? '#0919a8' :
//                 d === "6a"  ? '#7263f5' :
//                 d === "6b"  ? '#fdfcfd':
//                 d === "7a"  ? '#b2f17e' :
//                 d === "7b"  ? '#59f12a' :
//                 d === "8a"  ? '#0c7022' :
//                 d === "8b"  ? '#FED976' :
//                 d === "9a"  ? '#faf73d' :
//                 d === "9b"  ? '#f7ac77' :
//                 d === "10a" ? '#FD8D3C' :
//                 d === "10b" ? '#FC4E2A' :
//                 d === "11a" ? '#E31A1C':
//                 d === "12a" ? '#BD0026' :
// }
//     function style(feature) {
//     return {
//         fillColor: getColor(feature.properties.zone),
//         weight: 2,
//         opacity: 1,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.7
//     };
// }

// function onEachFeature(feature, layer) {

//     if (feature.properties) {

//         var popupContent =
//             "<p>Zone: " + feature.properties.zone + "</p>" +
//             "<p>Average Annual Extreme Winter Temperature: " + feature.properties.trange + "</p>";

//         layer.bindPopup(popupContent);
//     }
// };

// var geojson;

// function highlightFeature(e) {
//     var layer = e.target;

//     layer.setStyle({
//         weight: 5,
//         color: '#666',
//         dashArray: '',
//         fillOpacity: 0.7
//     });

//     layer.bringToFront();
//     info.update(layer.feature.zone);
// }

// function resetHighlight(e) {
//     geojson.resetStyle(e.target);
//     info.update();
// }

// function onEachFeature2(feature, layer) {
    
//     layer.bindTooltip(feature.properties.trange);

//     layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//     });
// }