mapboxgl.accessToken = 'pk.eyJ1IjoiamFuZHJlLXBybyIsImEiOiJjbWxmaTFsOTIwMjY5M2VvaWIzbWgyb3F2In0.6E3iTTICdzYRJcjiQGGCMQ';
const map = new mapboxgl.Map({
  container: 'map', // weird different way to call div
  style: 'mapbox://styles/jandre-pro/cmlwyuil3000401sm8dnye6eg', // My tile URL
  center: [-98.5795, 39.8283], // centered [lng, lat]
  zoom: 3.5 // zoom for lower 48 US
});

map.on('load', () => { //have to use this to allow json fetch

    fetch('data/phzm_us_zones_shp_2023.json')
        .then(response => response.json())
        .then(data => {

            map.addSource('zones', {
                type: 'geojson',
                data: data
            });

            map.addLayer({  //Poly style for my json - theres probably a better way to do this
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

                        '#040500' // default color needed to run everything else - LAME
                    ],
                    'fill-opacity': 0.4
                }
            });
        });
});       

//TRIED SOMETHING THAT DIDNT WORK - WILL GET BACK TO THIS LATER
// const zoneColor = [['get', 'zone'],

//                         '3a', '#03c2f1',
//                         '3b', '#025a68',
//                         '4a', '#0681f3',
//                         '4b', '#045fd4',
//                         '5a', '#0334b9',
//                         '5b', '#0919a8',
//                         '6a', '#7263f5',
//                         '6b', '#fdfcfd',
//                         '7a', '#b2f17e',
//                         '7b', '#59f12a',
//                         '8a', '#0c7022',
//                         '8b', '#FED976',
//                         '9a', '#faf73d',
//                         '9b', '#f7ac77',
//                         '10a', '#FD8D3C',
//                         '10b', '#FC4E2A',
//                         '11a', '#E31A1C',
//                         '12a', '#BD0026',

//                         '#cccccc' // default color
//                     ]

map.on('click', 'zones-layer', (e) => { //Sets click event

    const properties = e.features[0].properties;

    const popupContent = // sets output of click event- need to incorporate color somehow
            "<p>Zone: " + properties.zone + "</p>" +
            "<p>Average Annual Extreme Winter Temperature: " + properties.trange + "(F)"+"</p>";
        
    new mapboxgl.Popup() // calls pop up resulting from click event and content
        .setLngLat(e.lngLat)
        .setHTML(popupContent)
        .addTo(map); //adds to map
});
        