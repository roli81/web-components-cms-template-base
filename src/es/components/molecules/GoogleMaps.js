import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js';

export default class GoogleMaps extends Shadow() {

    bounds = new google.maps.LatLngBounds();
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

        this.bounds.extend(marker.position);

        if (markerData.content) {
            this.addInfoWindow(gMap, marker, markerData.content);
        }

        gMap.fitBounds(this.bounds);
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

        
     
        // const myMarkers = Array.from([this.root.querySelector('g-maps-marker')]).map(c => {

        //     return {
        //         lat: parseFloat(c.getAttribute('lat')),
        //         lng: parseFloat(c.getAttribute('long')),
        //         content: c.innerHTML
        //     };

        // });  


       

        

        const markers = Array.from(this.shadowRoot.querySelectorAll('base-g-maps-marker'))
        .map(m => {
            let res = {
                lat: parseFloat(m.getAttribute('lat')),
                lng: parseFloat(m.getAttribute('long')),
                content: m.innerHTML 
            }; 

            m.innerHTML = '';
            return res; 
        });





  

        markers.forEach(m => this.addMarker(gMap, m));
  

        
        this.map = gMap; 
        this.html = this.container;
    }

    


};