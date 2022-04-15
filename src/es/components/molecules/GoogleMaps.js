import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js';

export default class GoogleMaps extends Shadow() {
    constructor(...args)
    {
        super(...args);
    }


    uluru = { lat: -25.344, lng: 131.031 };

    connectedCallback () {
        if (this.shouldComponentRenderCSS()) this.renderCSS();
        if (this.shouldComponentRenderHTML()) this.renderMap();
    }


    disconnectedCallback() {

    }

    shouldComponentRenderHTML () {
        return !this.root.querySelector('div');
    }

    shouldComponentRenderCSS () {
        return !this.root.querySelector('style[_css]');
    }

    renderCSS() {
        this.css = `
            div.g-maps {
                height: 50vh;
                color: #000000;
            }
        
            div.g-maps  button {
                color: red;
                background-color: #000000;
            }
        `;

    } 



    addMarker(gMap, markerData) {
        const marker = new google.maps.Marker({
            position: {lat: markerData.lat, lng: markerData.lng},
            map: gMap
        });

        if (markerData.content) {
            this.addInfoWindow(gMap, marker, markerData.content);
        }
    }


    addInfoWindow(gMap, marker, content) {
        const infoWindow = new google.maps.InfoWindow({
            content: content
        });

        marker.addListener('click', () => {
            infoWindow.open({
                anchor: marker,
                gMap,
                shouldFocus: true
            })
        });

    }

    renderMap() {
        this.container = document.createElement('DIV');
        this.map = document.createElement('DIV');
        this.map.className = 'g-maps';
        this.map.setAttribute('id', 'map');
        this.container.appendChild(this.map);

        const gMap = new google.maps.Map(this.map, {
            center: {lat: 47.453591281777086, lng: 9.184775417772617},
            zoom: 10,
          });



        const myMarkers =  [
            { lat: 47.472206783788245, lng: 9.108083410082028, content: `<h2>Silvan</h2>` },
            { lat: 47.39663407116479, lng: 9.26541415901077, content: `<h2>Andy</h2>` },
            { lat: 47.50604144650605, lng: 9.159988250182659, content: `<h2>Roli</h2>` }
        ];

        let infoWindowContent = `<h2>Affenarsch</h2>`;  

        myMarkers.forEach(m => this.addMarker(gMap, m));
        this.addMarker(gMap, infoWindowContent);

        this.map = gMap; 
        this.html = this.container;
    }

    

};